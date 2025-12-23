import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions from the user
 * @returns {Promise<boolean>} true if permissions granted, false otherwise
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been determined
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push notification permissions!");
      return false;
    }

    // Get the token that uniquely identifies this device
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return true;
  } catch (error) {
    console.error("Error requesting notification permissions:", error);
    return false;
  }
}

/**
 * Schedule a notification for a specific time
 * @param title - Notification title
 * @param body - Notification message
 * @param trigger - When to show the notification
 * @param data - Additional data to include
 * @returns {Promise<string>} Notification ID
 */
export async function scheduleNotification(
  title: string,
  body: string,
  trigger: Date | number,
  data?: any
): Promise<string | null> {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.log("No notification permission");
      return null;
    }

    let scheduleTrigger;
    if (trigger instanceof Date) {
      // Schedule for specific date/time
      scheduleTrigger = trigger;
    } else {
      // Schedule after X seconds
      scheduleTrigger = { seconds: trigger };
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: data || {},
        sound: true,
      },
      trigger: scheduleTrigger,
    });

    return notificationId;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return null;
  }
}

/**
 * Schedule a notification 15 minutes before a session starts
 * @param sessionTitle - Title of the session
 * @param sessionTime - When the session starts (Date object)
 * @param venue - Optional venue information
 * @param sessionId - Session ID for tracking
 * @returns {Promise<string>} Notification ID
 */
export async function scheduleSessionReminder(
  sessionTitle: string,
  sessionTime: Date,
  venue?: string,
  sessionId?: string
): Promise<string | null> {
  const reminderTime = new Date(sessionTime);
  reminderTime.setMinutes(reminderTime.getMinutes() - 15); // 15 minutes before

  // Don't schedule if time is in the past
  if (reminderTime <= new Date()) {
    console.log("Session time is in the past, not scheduling");
    return null;
  }

  const body = `Starts in 15 minutes${venue ? ` at ${venue}` : ""}`;

  return await scheduleNotification(sessionTitle, body, reminderTime, {
    sessionId,
    type: "session_reminder",
  });
}

/**
 * Send an immediate notification
 * @param title - Notification title
 * @param body - Notification message
 * @param data - Additional data
 * @returns {Promise<string>} Notification ID
 */
export async function sendImmediateNotification(
  title: string,
  body: string,
  data?: any
): Promise<string | null> {
  return await scheduleNotification(title, body, 1, data);
}

/**
 * Cancel a scheduled notification
 * @param notificationId - ID of the notification to cancel
 */
export async function cancelNotification(
  notificationId: string
): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error("Error canceling notification:", error);
  }
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Error canceling all notifications:", error);
  }
}

/**
 * Get all scheduled notifications
 * @returns {Promise<Notifications.NotificationRequest[]>} Array of scheduled notifications
 */
export async function getAllScheduledNotifications(): Promise<
  Notifications.NotificationRequest[]
> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Error getting scheduled notifications:", error);
    return [];
  }
}

/**
 * Parse session time string to Date object
 * Helper function to convert session time strings like "09th January, 2026, Friday 10:00 to 12:00"
 * to Date objects
 */
export function parseSessionTime(
  timeString: string,
  dayNumber: number
): Date | null {
  try {
    // Extract time from string like "10:00 to 12:00" or "10:00 - 11:00"
    const timeMatch = timeString.match(/(\d{1,2}):(\d{2})/);
    if (!timeMatch) return null;

    const hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2]);

    // Conference dates: Jan 9-10, 2026
    const year = 2026;
    const month = 0; // January (0-indexed)
    const day = dayNumber === 1 ? 9 : 10;

    const sessionDate = new Date(year, month, day, hours, minutes, 0);
    return sessionDate;
  } catch (error) {
    console.error("Error parsing session time:", error);
    return null;
  }
}

/**
 * Set up notification response listener
 * Call this when your app starts to handle notification taps
 */
export function setupNotificationResponseListener(
  callback: (notification: Notifications.Notification) => void
): () => void {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      callback(response.notification);
    }
  );

  return () => subscription.remove();
}

/**
 * Set up notification received listener
 * Call this when your app starts to handle notifications received while app is in foreground
 */
export function setupNotificationReceivedListener(
  callback: (notification: Notifications.Notification) => void
): () => void {
  const subscription = Notifications.addNotificationReceivedListener(callback);
  return () => subscription.remove();
}
