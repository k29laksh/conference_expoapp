import Footer from "@/components/Footer";
import {
  getScheduledNotifications,
  requestNotificationPermissions,
  sendTestNotification,
} from "@/utils/notificationManager";
import { sessionStorage } from "@/utils/sessionStorage";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  venue?: string;
  speaker?: string;
  designation?: string;
  type: "session" | "break";
  day: number;
}

export default function BasketScreen() {
  const [savedSessions, setSavedSessions] = useState<ScheduleItem[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "day1" | "day2">("all");
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [scheduledNotificationsCount, setScheduledNotificationsCount] =
    useState(0);

  useEffect(() => {
    // Subscribe to session storage changes
    const updateSavedSessions = async () => {
      // Ensure storage is initialized before reading
      await sessionStorage.initialize();
      const sessions = sessionStorage.getSavedSessions();
      setSavedSessions(sessions);
    };

    updateSavedSessions();
    const unsubscribe = sessionStorage.subscribe(() => {
      const sessions = sessionStorage.getSavedSessions();
      setSavedSessions(sessions);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    checkTimeConflicts();
    checkNotificationStatus();
  }, [savedSessions]);

  const checkNotificationStatus = async () => {
    try {
      const scheduled = await getScheduledNotifications();
      setScheduledNotificationsCount(scheduled.length);
      setNotificationsEnabled(scheduled.length > 0);
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermissions();
    if (granted) {
      Alert.alert(
        "Notifications Enabled",
        "You will receive reminders 10 minutes before each session starts.",
        [{ text: "OK" }]
      );
      await checkNotificationStatus();
    } else {
      Alert.alert(
        "Permission Denied",
        "Please enable notifications in your device settings to receive session reminders.",
        [{ text: "OK" }]
      );
    }
  };

  const handleTestNotification = async () => {
    try {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert(
          "Permission Required",
          "Please enable notifications to test.",
          [{ text: "OK" }]
        );
        return;
      }

      await sendTestNotification();
      Alert.alert(
        "Test Notification Sent",
        "A test notification will appear in 2 seconds. You can close the app to test background notifications.",
        [{ text: "OK" }]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to send test notification. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const checkTimeConflicts = () => {
    // Check for time conflicts
    const conflictIds: string[] = [];
    const sessionsByTime: { [key: string]: ScheduleItem[] } = {};

    savedSessions.forEach((session) => {
      if (session.type === "session") {
        const key = `${session.day}-${session.time}`;
        if (!sessionsByTime[key]) {
          sessionsByTime[key] = [];
        }
        sessionsByTime[key].push(session);
      }
    });

    Object.values(sessionsByTime).forEach((sessions) => {
      if (sessions.length > 1) {
        sessions.forEach((s) => conflictIds.push(s.id));
      }
    });

    setConflicts(conflictIds);
  };

  const removeSession = (sessionId: string) => {
    Alert.alert(
      "Remove Session",
      "Are you sure you want to remove this session from your schedule?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            sessionStorage.removeSession(sessionId);
          },
        },
      ]
    );
  };

  const handleShare = async () => {
    if (savedSessions.length === 0) {
      Alert.alert("No Sessions", "Your schedule is empty.");
      return;
    }

    const scheduleText = savedSessions
      .map(
        (session) =>
          `${session.title}\n${session.time}${
            session.venue ? `\n${session.venue}` : ""
          }\n`
      )
      .join("\n");

    try {
      await Share.share({
        message: `My MET-I-CON 2026 Schedule:\n\n${scheduleText}`,
        title: "My Conference Schedule",
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share schedule");
    }
  };

  const handleExport = () => {
    // TODO: Implement export to calendar/PDF
    Alert.alert(
      "Export Schedule",
      "Export functionality will be available soon.",
      [{ text: "OK" }]
    );
  };

  const filteredSessions = savedSessions.filter((session) => {
    if (viewMode === "all") return true;
    if (viewMode === "day1") return session.day === 1;
    if (viewMode === "day2") return session.day === 2;
    return true;
  });

  const groupedByDay = filteredSessions.reduce((acc, session) => {
    const day = `Day ${session.day}`;
    if (!acc[day]) acc[day] = [];
    acc[day].push(session);
    return acc;
  }, {} as { [key: string]: ScheduleItem[] });

  // Sort sessions by time within each day
  Object.keys(groupedByDay).forEach((day) => {
    groupedByDay[day].sort((a, b) => {
      const timeA = a.time.split(" - ")[0].replace(":", "");
      const timeB = b.time.split(" - ")[0].replace(":", "");
      return parseInt(timeA) - parseInt(timeB);
    });
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>My Schedule</Text>
              <Text style={styles.headerSubtitle}>
                {savedSessions.length} session(s) saved
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleTestNotification}
                accessibilityLabel="Test Notification"
              >
                <MaterialIcons
                  name="notifications-active"
                  size={24}
                  color="#059669"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <MaterialIcons name="share" size={24} color="#EF4444" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleExport}
              >
                <MaterialIcons name="file-download" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* View Mode Toggle */}
          <View style={styles.viewModeContainer}>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "all" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("all")}
            >
              <Text
                style={[
                  styles.viewModeText,
                  viewMode === "all" && styles.viewModeTextActive,
                ]}
              >
                All Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "day1" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("day1")}
            >
              <Text
                style={[
                  styles.viewModeText,
                  viewMode === "day1" && styles.viewModeTextActive,
                ]}
              >
                Day 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "day2" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("day2")}
            >
              <Text
                style={[
                  styles.viewModeText,
                  viewMode === "day2" && styles.viewModeTextActive,
                ]}
              >
                Day 2
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conflict Warning */}
          {conflicts.length > 0 && (
            <View style={styles.conflictWarning}>
              <MaterialIcons name="warning" size={20} color="#EF4444" />
              <Text style={styles.conflictText}>
                {conflicts.length} time conflict(s) detected
              </Text>
            </View>
          )}

          {/* Notification Status */}
          {savedSessions.length > 0 && (
            <View
              style={[
                styles.notificationBanner,
                notificationsEnabled
                  ? styles.notificationBannerEnabled
                  : styles.notificationBannerDisabled,
              ]}
            >
              <MaterialIcons
                name={
                  notificationsEnabled
                    ? "notifications-active"
                    : "notifications-off"
                }
                size={20}
                color={notificationsEnabled ? "#059669" : "#6B7280"}
              />
              <Text
                style={[
                  styles.notificationText,
                  notificationsEnabled
                    ? styles.notificationTextEnabled
                    : styles.notificationTextDisabled,
                ]}
              >
                {notificationsEnabled
                  ? `${scheduledNotificationsCount} notification(s) scheduled`
                  : "Enable notifications for session reminders"}
              </Text>
              {!notificationsEnabled && (
                <TouchableOpacity
                  style={styles.enableButton}
                  onPress={handleEnableNotifications}
                >
                  <Text style={styles.enableButtonText}>Enable</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Sessions List */}
        {savedSessions.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-available" size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No Sessions Added</Text>
            <Text style={styles.emptyText}>
              Build your personalized conference schedule by selecting sessions
              that interest you.
            </Text>
            <Text style={styles.emptySubtext}>
              💡 Go to the Schedule tab and tap the bookmark icon to save
              sessions
            </Text>
          </View>
        ) : (
          <View style={styles.sessionsContainer}>
            {Object.entries(groupedByDay).map(([day, sessions]) => (
              <View key={day} style={styles.daySection}>
                <Text style={styles.dayHeader}>{day}</Text>
                {sessions.map((session) => (
                  <View
                    key={session.id}
                    style={[
                      styles.sessionCard,
                      conflicts.includes(session.id) &&
                        styles.sessionCardConflict,
                    ]}
                  >
                    <View style={styles.sessionContent}>
                      <View style={styles.sessionTime}>
                        <MaterialIcons name="schedule" size={16} color="#666" />
                        <Text style={styles.timeText}>{session.time}</Text>
                        {notificationsEnabled && (
                          <View style={styles.notificationIndicator}>
                            <MaterialIcons
                              name="notifications"
                              size={12}
                              color="#059669"
                            />
                          </View>
                        )}
                      </View>
                      <Text style={styles.sessionTitle}>{session.title}</Text>
                      {session.venue && (
                        <View style={styles.venueContainer}>
                          <MaterialIcons
                            name="location-on"
                            size={14}
                            color="#666"
                          />
                          <Text style={styles.venueText}>{session.venue}</Text>
                        </View>
                      )}
                      {session.speaker && (
                        <View style={styles.speakerContainer}>
                          <MaterialIcons name="person" size={14} color="#666" />
                          <Text style={styles.speakerText}>
                            {session.speaker}
                          </Text>
                        </View>
                      )}
                      {conflicts.includes(session.id) && (
                        <View style={styles.conflictBadge}>
                          <MaterialIcons
                            name="warning"
                            size={14}
                            color="#EF4444"
                          />
                          <Text style={styles.conflictBadgeText}>
                            Time Conflict
                          </Text>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeSession(session.id)}
                    >
                      <MaterialIcons name="delete" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  viewModeContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    gap: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  viewModeButtonActive: {
    backgroundColor: "#EF4444",
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  viewModeTextActive: {
    color: "#fff",
  },
  conflictWarning: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
  },
  conflictText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
  notificationBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
  },
  notificationBannerEnabled: {
    backgroundColor: "#D1FAE5",
  },
  notificationBannerDisabled: {
    backgroundColor: "#F3F4F6",
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  notificationTextEnabled: {
    color: "#059669",
  },
  notificationTextDisabled: {
    color: "#6B7280",
  },
  enableButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  enableButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 18,
  },
  sessionsContainer: {
    padding: 16,
  },
  daySection: {
    marginBottom: 24,
  },
  dayHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#EF4444",
  },
  sessionCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionCardConflict: {
    borderColor: "#EF4444",
    borderWidth: 2,
  },
  sessionContent: {
    flex: 1,
  },
  sessionTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  notificationIndicator: {
    marginLeft: 4,
    backgroundColor: "#D1FAE5",
    borderRadius: 10,
    padding: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  venueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  venueText: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
  },
  speakerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  speakerText: {
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
  },
  conflictBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#FEE2E2",
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  conflictBadgeText: {
    fontSize: 12,
    color: "#EF4444",
    fontWeight: "500",
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    lineHeight: 20,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  preferenceInfo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    marginRight: 16,
  },
  preferenceText: {
    flex: 1,
    marginLeft: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 18,
  },
  modalButton: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
