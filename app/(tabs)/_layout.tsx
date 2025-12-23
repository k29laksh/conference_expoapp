import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  requestNotificationPermissions,
  setupNotificationReceivedListener,
} from "@/utils/notificationSetup";
import { sessionStorage } from "@/utils/sessionStorage";

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    // Request notification permissions on app mount
    requestNotificationPermissions().then((granted) => {
      if (granted) {
        console.log("Notification permissions granted");
      } else {
        console.log("Notification permissions denied");
      }
    });

    // Set up notification listener for foreground notifications
    const unsubscribeNotifications = setupNotificationReceivedListener(
      (notification) => {
        console.log("Notification received in foreground:", notification);
      }
    );

    return () => {
      unsubscribeNotifications();
    };
  }, []);

  useEffect(() => {
    // Subscribe to session storage changes to update badge
    const updateBadgeCount = () => {
      // Only count sessions (not speakers) to avoid double counting from cross-linking
      const count = sessionStorage.getSavedSessions().length;
      setBadgeCount(count);
    };

    updateBadgeCount();
    const unsubscribe = sessionStorage.subscribe(updateBadgeCount);

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      {isLargeScreen && <Sidebar />}
      <View style={styles.content}>
        <Header />

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#EF4444",
            tabBarInactiveTintColor: "#757779ff",
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopColor: "#e1e4eaff",
              paddingVertical: 4,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "500",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              // 2. Use MaterialIcons directly here
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="schedule"
            options={{
              title: "Schedule",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="calendar-today" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="speakers"
            options={{
              title: "Experts", // Renamed to match your website screenshot
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="groups" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: "About",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="info" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="resources"
            options={{
              title: "Resources",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="folder-open" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="basket"
            options={{
              title: "My Schedule",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="bookmark" size={24} color={color} />
              ),
              tabBarBadge: badgeCount > 0 ? badgeCount : undefined,
            }}
          />
          <Tabs.Screen
            name="registration"
            options={{
              href: null, // Hide from tab bar
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              href: null, // Hide from tab bar
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
});
