import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  requestNotificationPermissions,
  scheduleSessionReminder,
} from "@/utils/notificationManager";
import { sessionStorage } from "@/utils/sessionStorage";
import { checkAndDownloadUpdateSilently } from "@/utils/updateManager";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Initialize app: storage and notifications
    const initializeApp = async () => {
      try {
        // Initialize persistent storage
        await sessionStorage.initialize();
        console.log("Session storage initialized");

        // Request notification permissions
        const permissionGranted = await requestNotificationPermissions();
        if (permissionGranted) {
          console.log("Notification permissions granted");

          // Reschedule notifications for all saved sessions
          const savedSessions = sessionStorage.getSavedSessions();
          for (const session of savedSessions) {
            if (session.type === "session") {
              await scheduleSessionReminder(
                session.id,
                session.title,
                session.time,
                session.day
              );
            }
          }
          console.log(
            `Rescheduled ${savedSessions.length} session notifications`
          );
        } else {
          console.log("Notification permissions denied");
        }

        // Check for OTA updates silently in background
        await checkAndDownloadUpdateSilently();
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initializeApp();

    // Listen for notifications received while app is in foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received in foreground:", notification);
      });

    // Listen for user interactions with notifications (tapping on notification)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
        const data = response.notification.request.content.data;
        // You can navigate to specific session here if needed
        if (data.sessionId) {
          console.log("Navigate to session:", data.sessionId);
          // router.push(`/(tabs)/basket`); // Navigate to basket/schedule
        }
      });

    return () => {
      // Cleanup notification listeners
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
