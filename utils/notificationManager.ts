// Notification preferences and management
import {
  cancelNotification,
  parseSessionTime,
  scheduleSessionReminder,
  sendImmediateNotification,
} from "./notificationSetup";

export interface NotificationPreferences {
  sessionStarts: boolean;
  sessionChanges: boolean;
  venueUpdates: boolean;
  generalAnnouncements: boolean;
}

export interface Notification {
  id: string;
  type: "session_start" | "session_change" | "venue_update" | "announcement";
  title: string;
  message: string;
  timestamp: Date;
  sessionId?: string;
  read: boolean;
}

// Default preferences
const DEFAULT_PREFERENCES: NotificationPreferences = {
  sessionStarts: true,
  sessionChanges: true,
  venueUpdates: true,
  generalAnnouncements: true,
};

// In-memory storage
let preferences: NotificationPreferences = { ...DEFAULT_PREFERENCES };
let notifications: Notification[] = [];
let listeners: (() => void)[] = [];
let scheduledNotificationIds: Map<string, string> = new Map(); // sessionId -> notificationId

export const notificationManager = {
  // Get current preferences
  getPreferences: (): NotificationPreferences => {
    return { ...preferences };
  },

  // Update preferences
  updatePreferences: (
    newPreferences: Partial<NotificationPreferences>
  ): void => {
    preferences = { ...preferences, ...newPreferences };
    notifyListeners();
    // TODO: Save to AsyncStorage
  },

  // Reset to defaults
  resetPreferences: (): void => {
    preferences = { ...DEFAULT_PREFERENCES };
    notifyListeners();
  },

  // Get all notifications
  getNotifications: (): Notification[] => {
    return [...notifications].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  },

  // Get unread count
  getUnreadCount: (): number => {
    return notifications.filter((n) => !n.read).length;
  },

  // Add notification
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp" | "read">
  ): void => {
    // Check if this type is enabled
    const shouldAdd =
      (notification.type === "session_start" && preferences.sessionStarts) ||
      (notification.type === "session_change" && preferences.sessionChanges) ||
      (notification.type === "venue_update" && preferences.venueUpdates) ||
      (notification.type === "announcement" &&
        preferences.generalAnnouncements);

    if (!shouldAdd) return;

    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      read: false,
    };

    notifications.push(newNotification);
    notifyListeners();

    // In a real app, trigger push notification here
    // TODO: Use expo-notifications to show alert
  },

  // Mark notification as read
  markAsRead: (notificationId: string): void => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification) {
      notification.read = true;
      notifyListeners();
    }
  },

  // Mark all as read
  markAllAsRead: (): void => {
    notifications.forEach((n) => (n.read = true));
    notifyListeners();
  },

  // Delete notification
  deleteNotification: (notificationId: string): void => {
    notifications = notifications.filter((n) => n.id !== notificationId);
    notifyListeners();
  },

  // Clear all notifications
  clearAll: (): void => {
    notifications = [];
    notifyListeners();
  },

  // Subscribe to changes
  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  // Schedule session start notification with real push notification
  notifySessionStart: async (
    sessionTitle: string,
    time: string,
    venue?: string,
    sessionId?: string,
    dayNumber?: number
  ): Promise<void> => {
    // Add to in-app notification list
    notificationManager.addNotification({
      type: "session_start",
      title: "Added to Schedule",
      message: `"${sessionTitle}" starts at ${time}${
        venue ? ` at ${venue}` : ""
      }`,
      sessionId,
    });

    // Schedule real push notification if we have timing info
    if (sessionId && dayNumber) {
      const sessionTime = parseSessionTime(time, dayNumber);
      if (sessionTime) {
        const notifId = await scheduleSessionReminder(
          sessionTitle,
          sessionTime,
          venue,
          sessionId
        );
        if (notifId) {
          scheduledNotificationIds.set(sessionId, notifId);
          console.log(
            `Scheduled notification for session ${sessionId}:`,
            notifId
          );
        }
      }
    }
  },

  // Session change notification with real push
  notifySessionChange: async (
    sessionTitle: string,
    changes: string
  ): Promise<void> => {
    notificationManager.addNotification({
      type: "session_change",
      title: "Session Update",
      message: `"${sessionTitle}": ${changes}`,
    });

    // Send immediate push notification
    await sendImmediateNotification(
      "Session Update",
      `"${sessionTitle}": ${changes}`,
      { type: "session_change" }
    );
  },

  // Venue update notification with real push
  notifyVenueUpdate: async (
    sessionTitle: string,
    oldVenue: string,
    newVenue: string
  ): Promise<void> => {
    notificationManager.addNotification({
      type: "venue_update",
      title: "Venue Changed",
      message: `"${sessionTitle}" moved from ${oldVenue} to ${newVenue}`,
    });

    // Send immediate push notification
    await sendImmediateNotification(
      "Venue Changed",
      `"${sessionTitle}" moved from ${oldVenue} to ${newVenue}`,
      { type: "venue_update" }
    );
  },

  // General announcement with real push
  notifyAnnouncement: async (title: string, message: string): Promise<void> => {
    notificationManager.addNotification({
      type: "announcement",
      title,
      message,
    });

    // Send immediate push notification
    await sendImmediateNotification(title, message, { type: "announcement" });
  },

  // Cancel scheduled notification for a session
  cancelSessionNotification: async (sessionId: string): Promise<void> => {
    const notifId = scheduledNotificationIds.get(sessionId);
    if (notifId) {
      await cancelNotification(notifId);
      scheduledNotificationIds.delete(sessionId);
      console.log(`Cancelled notification for session ${sessionId}`);
    }
  },
};

// Notify all listeners
function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// TODO: Replace with expo-notifications implementation
/*
import * as Notifications from 'expo-notifications';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permissions
export async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Failed to get push notification permissions!');
    return;
  }
}

// Schedule notification
export async function scheduleSessionNotification(
  sessionTitle: string,
  sessionTime: Date,
  venue?: string
) {
  const notificationTime = new Date(sessionTime);
  notificationTime.setMinutes(notificationTime.getMinutes() - 15); // 15 min before

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Session Starting Soon',
      body: `"${sessionTitle}" starts in 15 minutes${venue ? ` at ${venue}` : ''}`,
      data: { sessionTitle, venue },
    },
    trigger: notificationTime,
  });
}
*/
