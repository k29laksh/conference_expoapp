import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { requestNotificationPermissions } from "@/utils/notificationSetup";
import { sessionStorage } from "@/utils/sessionStorage";
import { checkAndDownloadUpdateSilently } from "@/utils/updateManager";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Initialize app: storage and notifications
    const initializeApp = async () => {
      try {
        // Initialize persistent storage
        await sessionStorage.initialize();
        console.log("Session storage initialized");

        // Request notification permissions
        const hasPermission = await requestNotificationPermissions();
        if (hasPermission) {
          console.log("Notification permissions granted");
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
  }, []);

  return (
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
  );
}
