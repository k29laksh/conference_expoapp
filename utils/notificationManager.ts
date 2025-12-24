import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Deprecated on newer iOS but kept for fallback
    shouldShowBanner: true, // Correct for newer versions
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowList: true,
  }),
});

interface SessionNotification {
  sessionId: string;
  notificationId: string;
}

const NOTIFICATION_STORAGE_KEY = 'scheduled_notifications';

// Request notification permissions
export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    return false;
  }

  // For Android, create notification channel
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('session-reminders', {
      name: 'Session Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#E31E24',
    });
  }

  return true;
}

// Parse time string (e.g., "10:00") and date to create a Date object
function parseSessionDateTime(timeString: string, day: number): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  
  // For testing: Day 0 = Today/Tomorrow depending on time
  let conferenceDate: Date;
  if (day === 0) {
    // Day 0 testing: Use current date
    conferenceDate = new Date();
    conferenceDate.setHours(hours, minutes, 0, 0);
    
    // If the time already passed today (with a 5 min buffer), schedule for tomorrow
    // This prevents "Day 0" testing from creating past dates that look like future dates to the math
    if (conferenceDate.getTime() < Date.now() - 5 * 60 * 1000) {
      conferenceDate.setDate(conferenceDate.getDate() + 1);
    }
  } else {
    // Production dates: Day 1 = Jan 9, Day 2 = Jan 10, 2026
    conferenceDate = new Date(2026, 0, 8 + day); // January is month 0
    conferenceDate.setHours(hours, minutes, 0, 0);
  }
  
  return conferenceDate;
}

// Schedule notification 10 minutes before session
export async function scheduleSessionReminder(
  sessionId: string,
  sessionTitle: string,
  sessionTime: string,
  day: number
): Promise<string | null> {
  try {
    // Parse the start time
    const startTimeString = sessionTime.split(' - ')[0];
    const sessionDateTime = parseSessionDateTime(startTimeString, day);
    
    // Schedule 10 minutes before
    const reminderTime = new Date(sessionDateTime.getTime() - 10 * 60 * 1000);
    const now = new Date();

    // Calculate seconds until the reminder should fire
    const secondsFromNow = Math.floor((reminderTime.getTime() - now.getTime()) / 1000);
    
    // --- FIX IMPLEMENTED HERE ---
    // If the reminder time is in the past OR effectively "now" (less than 60 seconds away),
    // do NOT schedule it. This prevents the "instant trigger" when adding a session close to start time.
    if (secondsFromNow < 60) {
      console.log(`Reminder time for "${sessionTitle}" is too close (${secondsFromNow}s) or in past. Skipping notification.`);
      return null;
    }

    console.log(`Scheduling notification for "${sessionTitle}" in ${secondsFromNow} seconds (at ${reminderTime.toLocaleString()})`);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '📣 Session Starting Soon!',
        body: `"${sessionTitle}" starts in 10 minutes`,
        data: { sessionId, sessionTime },
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: secondsFromNow,
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // Explicitly specify type
      },
    });

    // Save the notification mapping
    await saveNotificationMapping(sessionId, notificationId);
    
    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

// Cancel notification for a session
export async function cancelSessionReminder(sessionId: string): Promise<void> {
  try {
    const notificationId = await getNotificationIdForSession(sessionId);
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      await removeNotificationMapping(sessionId);
      console.log(`Cancelled notification for session ${sessionId}`);
    }
  } catch (error) {
    console.error('Error cancelling notification:', error);
  }
}

// Save notification mapping to AsyncStorage
async function saveNotificationMapping(sessionId: string, notificationId: string): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const mappings: SessionNotification[] = existing ? JSON.parse(existing) : [];
    
    // Remove any existing mapping for this session to avoid duplicates
    const filtered = mappings.filter(m => m.sessionId !== sessionId);
    filtered.push({ sessionId, notificationId });
    
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error saving notification mapping:', error);
  }
}

// Get notification ID for a session
async function getNotificationIdForSession(sessionId: string): Promise<string | null> {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!existing) return null;
    
    const mappings: SessionNotification[] = JSON.parse(existing);
    const mapping = mappings.find(m => m.sessionId === sessionId);
    return mapping?.notificationId || null;
  } catch (error) {
    console.error('Error getting notification ID:', error);
    return null;
  }
}

// Remove notification mapping
async function removeNotificationMapping(sessionId: string): Promise<void> {
  try {
    const existing = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!existing) return;
    
    const mappings: SessionNotification[] = JSON.parse(existing);
    const filtered = mappings.filter(m => m.sessionId !== sessionId);
    
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing notification mapping:', error);
  }
}

// Cancel all scheduled notifications
export async function cancelAllSessionReminders(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    console.log('Cancelled all notifications');
  } catch (error) {
    console.error('Error cancelling all notifications:', error);
  }
}

// Get all scheduled notifications (for debugging)
export async function getScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}