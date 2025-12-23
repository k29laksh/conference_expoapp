# MET-I-CON Notification System

## Overview

The MET-I-CON app now includes a complete real-time push notification system using expo-notifications. Users receive timely alerts about their saved sessions, venue changes, and conference announcements.

## Features

### 1. **Session Reminders**

- Automatic push notifications 15 minutes before saved sessions
- Includes session title, time, and venue information
- Only sent if user has enabled "Session Starts" preference

### 2. **Session Updates**

- Real-time notifications when session details change
- Covers time changes, speaker updates, etc.
- Controlled by "Session Changes" preference

### 3. **Venue Updates**

- Immediate alerts when session locations change
- Shows old and new venue information
- Controlled by "Venue Updates" preference

### 4. **General Announcements**

- Important conference-wide updates
- Emergency notifications
- Controlled by "General Announcements" preference

## User Flow

### Enabling Notifications

1. App requests notification permissions on first launch
2. User grants/denies permissions
3. Permissions can be changed in device settings

### Adding Sessions to Schedule

1. User taps bookmark icon on Schedule or Experts tab
2. Session is saved to "My Schedule"
3. Automatic notification scheduled for 15 minutes before session
4. Confirmation alert shows: "You'll receive a reminder 15 minutes before it starts"

### Managing Preferences

1. Navigate to "My Schedule" tab
2. Tap the 🔔 notification bell icon
3. Toggle preferences:
   - ✅ Session Starts (15-min reminders)
   - ✅ Session Changes (update alerts)
   - ✅ Venue Updates (location changes)
   - ✅ General Announcements (conference news)

### Removing Sessions

1. Tap delete icon on session in "My Schedule"
2. Confirm removal
3. Scheduled notification is automatically cancelled

## Technical Implementation

### Key Files

#### `/utils/notificationSetup.ts`

Core notification functionality:

- `requestNotificationPermissions()` - Request user permissions
- `scheduleSessionReminder()` - Schedule 15-min reminder
- `sendImmediateNotification()` - Send instant notification
- `cancelNotification()` - Cancel scheduled notification
- `parseSessionTime()` - Convert session times to Date objects

#### `/utils/notificationManager.ts`

Notification management:

- Preference management (enable/disable categories)
- In-app notification history
- Integration with expo-notifications
- Automatic scheduling/cancellation

#### `/app/(tabs)/_layout.tsx`

App initialization:

- Request permissions on mount
- Set up notification listeners
- Handle foreground notifications

### Configuration

#### `app.json`

```json
{
  "plugins": [
    [
      "expo-notifications",
      {
        "icon": "./assets/images/icon.png",
        "color": "#EF4444",
        "mode": "production"
      }
    ]
  ],
  "android": {
    "permissions": [
      "POST_NOTIFICATIONS",
      "SCHEDULE_EXACT_ALARM",
      "USE_EXACT_ALARM"
    ]
  },
  "ios": {
    "infoPlist": {
      "UIBackgroundModes": ["remote-notification"]
    }
  }
}
```

## Session Scheduling Logic

### Time Parsing

Sessions are scheduled using:

- Conference dates: January 9-10, 2026
- Day 1: January 9, 2026
- Day 2: January 10, 2026
- Times extracted from session strings (e.g., "10:00 - 11:00")

### Notification Timing

- Scheduled 15 minutes before session start
- Example: Session at 10:00 AM → Notification at 9:45 AM
- Past sessions are not scheduled

### Automatic Cancellation

When user removes a session:

1. Session deleted from "My Schedule"
2. Scheduled notification cancelled automatically
3. No manual cleanup needed

## Testing

### Test Notifications

Use the "Test Notifications" button in My Schedule:

1. Session Start - Demo reminder notification
2. Session Change - Demo update notification
3. Venue Update - Demo location change
4. Announcement - Demo general announcement

### Verify Scheduling

```typescript
import { getAllScheduledNotifications } from "@/utils/notificationSetup";

// Get all scheduled notifications
const scheduled = await getAllScheduledNotifications();
console.log("Scheduled notifications:", scheduled);
```

## Permissions

### Android

- `POST_NOTIFICATIONS` - Send notifications (Android 13+)
- `SCHEDULE_EXACT_ALARM` - Schedule exact-time alarms
- `USE_EXACT_ALARM` - Use exact alarm API

### iOS

- `UIBackgroundModes: remote-notification` - Background notifications
- Automatic permission request on first use

## Best Practices

### For Users

1. ✅ Enable all notification categories for best experience
2. ✅ Check My Schedule regularly for conflicts
3. ✅ Allow notifications when prompted
4. ✅ Bookmark sessions early to receive reminders

### For Developers

1. Always check preferences before sending
2. Cancel notifications when sessions are removed
3. Handle permission denials gracefully
4. Test on both Android and iOS
5. Monitor notification performance

## Troubleshooting

### Notifications Not Appearing

1. Check device notification settings
2. Ensure app has notification permissions
3. Verify preference toggles are enabled
4. Check if session time is in the future

### Scheduled Notifications Not Working

1. Ensure expo-notifications is installed
2. Check Android permissions (SCHEDULE_EXACT_ALARM)
3. Verify session times are parsed correctly
4. Use `getAllScheduledNotifications()` to debug

### Permission Issues

1. Uninstall and reinstall app
2. Check device Settings → Apps → MET-I-CON → Notifications
3. Request permissions manually in app settings

## Future Enhancements

- [ ] Push notification server integration
- [ ] Customizable reminder times (5, 10, 15, 30 minutes)
- [ ] Notification sound customization
- [ ] Rich notifications with images
- [ ] Interactive notification actions (Mark as attended, etc.)
- [ ] Notification history view
- [ ] Badge count on app icon

## Support

For notification issues:

1. Check this documentation
2. Verify device notification settings
3. Test with demo notifications
4. Contact conference support

---

**Version:** 1.0.0  
**Last Updated:** December 23, 2025  
**Expo Notifications:** 0.32.15
