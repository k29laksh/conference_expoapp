import { sessionStorage } from "@/utils/sessionStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [badgeCount, setBadgeCount] = useState(0);

  useEffect(() => {
    const updateBadgeCount = () => {
      const count = sessionStorage.getSavedSessions().length;
      setBadgeCount(count);
    };

    updateBadgeCount();
    const unsubscribe = sessionStorage.subscribe(updateBadgeCount);

    return () => unsubscribe();
  }, []);

  const handleMySchedule = () => {
    router.push("/(tabs)/basket");
  };

  return (
    // 3. Add dynamic paddingTop to the style
    <View style={[styles.header, { paddingTop: insets.top }]}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <View style={styles.triangleTop} />
          <View style={styles.triangleBottom} />
        </View>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoTextMain}>BHUJBAL</Text>
          <Text style={styles.logoTextSub}>KNOWLEDGE CITY</Text>
          <View style={styles.trustBadge}>
            <Text style={styles.trustText}>Mumbai Educational Trust</Text>
          </View>
        </View>
      </View>

      {/* My Schedule Button */}
      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={handleMySchedule}
        activeOpacity={0.7}
        accessibilityLabel="My Schedule"
        accessibilityHint="Navigate to your schedule"
        accessibilityRole="button"
      >
        <View>
          <MaterialIcons name="event-note" size={28} color="#E31E24" />
          {badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    // 4. Change paddingVertical to just paddingBottom to avoid double padding the top
    paddingBottom: 12,
    paddingTop: 12, // Keep a little native padding + the inset we added above
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  // ... rest of your styles remain exactly the same ...
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 35,
    height: 40,
    position: "relative",
  },
  triangleTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 17.5,
    borderRightWidth: 17.5,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#E31E24",
  },
  triangleBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 17.5,
    borderRightWidth: 17.5,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#E31E24",
    marginTop: -2,
  },
  logoTextContainer: {
    alignItems: "flex-start",
  },
  logoTextMain: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#E31E24",
    letterSpacing: 0.5,
  },
  logoTextSub: {
    fontSize: 9,
    fontWeight: "600",
    color: "#333",
    letterSpacing: 0.3,
  },
  trustBadge: {
    backgroundColor: "#E31E24",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginTop: 1,
  },
  trustText: {
    fontSize: 6,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  scheduleButton: {
    padding: 8,
    alignItems: "center",
    gap: 2,
  },
  scheduleButtonText: {
    fontSize: 11,
    color: "#E31E24",
    fontWeight: "600",
    textTransform: "lowercase",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
});
