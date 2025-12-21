import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';

import { HapticTab } from "@/components/haptic-tab";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";


export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  return (
    <View style={styles.container}>
      {isLargeScreen && <Sidebar />}
      <View style={styles.content}>
        <Header />

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#EF4444",
            tabBarInactiveTintColor: "#9CA3AF",
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              borderTopWidth: 1,
              borderTopColor: "#F3F4F6",
              paddingVertical: 4,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: "500",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              // 2. Use MaterialIcons directly here
              tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="about"
            options={{
              title: "About",
              tabBarIcon: ({ color }) => <MaterialIcons name="info" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="speakers"
            options={{
              title: "Experts", // Renamed to match your website screenshot
              tabBarIcon: ({ color }) => <MaterialIcons name="groups" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="registration"
            options={{
              title: "Registration",
              tabBarIcon: ({ color }) => <MaterialIcons name="how-to-reg" size={24} color={color} />,
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Call for Paper", // Renamed to match your website
              tabBarIcon: ({ color }) => <MaterialIcons name="article" size={24} color={color} />,
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