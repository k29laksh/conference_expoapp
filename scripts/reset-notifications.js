/**
 * NOTIFICATION RESET UTILITY
 *
 * This script helps you reset all scheduled notifications.
 * Run this once to clear the 20 duplicate notifications.
 *
 * IMPORTANT: This is a ONE-TIME cleanup script.
 * After running this, your notifications will be rescheduled correctly
 * when you reopen the app (without duplicates thanks to the fix).
 *
 * HOW TO USE:
 * 1. Open your app
 * 2. Go to the About tab or any screen
 * 3. Open DevTools/Debug console
 * 4. Run the reset function provided below
 *
 * OR simply: Uninstall and reinstall the app to start fresh.
 */

console.log(`
╔════════════════════════════════════════════════════════╗
║     NOTIFICATION RESET INSTRUCTIONS                    ║
╚════════════════════════════════════════════════════════╝

📱 EASIEST METHOD - Reinstall the app:
   1. Uninstall the app from your device
   2. Reinstall it
   3. All notifications will be cleared
   4. Add sessions to basket again (they won't duplicate now!)

🔧 ALTERNATIVE - Manual reset via code:

   Add this button temporarily to any screen (e.g., About tab):

   import { Button } from 'react-native';
   import { cancelAllSessionReminders } from '@/utils/notificationManager';

   <Button 
     title="🔄 Reset All Notifications" 
     onPress={async () => {
       await cancelAllSessionReminders();
       alert('All notifications cleared! Close and reopen the app.');
     }}
   />

   After clicking it:
   - Close the app completely
   - Reopen it
   - Your saved sessions will auto-reschedule (only once each!)

💡 You can also clear AsyncStorage data via device settings:
   Settings > Apps > Your App > Storage > Clear Storage

`);
