import Footer from "@/components/Footer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResourcesScreen() {
  const handleSouvenir = () => {
    // Check if user is logged in (implement your auth logic)
    const isLoggedIn = false; // Replace with actual auth check

    if (!isLoggedIn) {
      Alert.alert(
        "Login Required",
        "Please login as a delegate to access the souvenir.",
        [{ text: "OK" }]
      );
      return;
    }

    // Replace with actual souvenir PDF URL
    Linking.openURL("https://example.com/souvenir.pdf");
  };

  const handleBrochure = async () => {
    try {
      // GitHub raw URL for the PDF
      // Replace with your actual GitHub raw URL after uploading
      const brochureUrl =
        "https://drive.google.com/file/d/10-VudCZuqVpshShvPQR_oPrNDg99WGiA/view?usp=sharing";

      await WebBrowser.openBrowserAsync(brochureUrl);
    } catch (error) {
      console.error("Error opening brochure:", error);
      Alert.alert("Error", "Unable to open brochure. Please try again.");
    }
  };

  const handleBooklet = () => {
    // Replace with actual booklet PDF URL
    Linking.openURL("https://example.com/booklet.pdf");
  };

  const handleAccommodation = async () => {
    try {
      const accommodationUrl =
        "https://drive.google.com/file/d/1eNWCSSISTQ_wowcLtmv_9TOzAGdCBNfb/view?usp=sharing";

      await WebBrowser.openBrowserAsync(accommodationUrl);
    } catch (error) {
      console.error("Error opening accommodation facility:", error);
      Alert.alert(
        "Error",
        "Unable to open accommodation facility. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        {/* Social Media Icons */}
        <View style={styles.socialSection}>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() =>
                Linking.openURL("https://www.youtube.com/@metiopnashik1321")
              }
            >
              <MaterialIcons name="smart-display" size={32} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() =>
                Linking.openURL(
                  "https://www.facebook.com/people/METs-Institute-of-Pharmacy-Bhujbal-Knowledge-City-Adgaon-Nashik/100063790905651/"
                )
              }
            >
              <MaterialIcons name="facebook" size={32} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() =>
                Linking.openURL(
                  "https://www.instagram.com/p/DLgzdSmIIBH/?utm_source=ig_web_copy_link"
                )
              }
            >
              <MaterialCommunityIcons
                name="instagram"
                size={32}
                color="#E4405F"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Resources Header */}
        <View style={styles.headerSection}>
          <MaterialIcons name="folder-open" size={40} color="#EF4444" />
          <Text style={styles.headerTitle}>Conference Resources</Text>
          <Text style={styles.headerSubtitle}>
            Access conference documents and materials
          </Text>
        </View>

        {/* Resource Cards */}
        <View style={styles.resourcesContainer}>
          {/* Souvenir */}
          <TouchableOpacity
            style={styles.resourceCard}
            onPress={handleSouvenir}
          >
            <View style={styles.cardIcon}>
              <MaterialIcons name="auto-stories" size={36} color="#10B981" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Conference Souvenir</Text>
              <Text style={styles.cardDescription}>
                Abstract book and conference highlights
              </Text>
              <View style={styles.badgeContainer}>
                <MaterialIcons name="lock" size={14} color="#666" />
                <Text style={styles.badgeText}>Delegates Only</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#666" />
          </TouchableOpacity>

          {/* Brochure */}
          <TouchableOpacity
            style={styles.resourceCard}
            onPress={handleBrochure}
          >
            <View style={styles.cardIcon}>
              <MaterialIcons name="description" size={36} color="#3B82F6" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Conference Brochure</Text>
              <Text style={styles.cardDescription}>
                Official conference brochure
              </Text>
              <View style={styles.badgeContainer}>
                <MaterialIcons name="public" size={14} color="#666" />
                <Text style={styles.badgeText}>Public Access</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#666" />
          </TouchableOpacity>

          {/* Booklet */}
          <TouchableOpacity style={styles.resourceCard} onPress={handleBooklet}>
            <View style={styles.cardIcon}>
              <MaterialIcons name="menu-book" size={36} color="#F59E0B" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Conference Session Booklet</Text>
              <Text style={styles.cardDescription}>
                Complete session program and schedule
              </Text>
              <View style={styles.badgeContainer}>
                <MaterialIcons name="public" size={14} color="#666" />
                <Text style={styles.badgeText}>Public Access</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#666" />
          </TouchableOpacity>

          {/* Accommodation Facility */}
          <TouchableOpacity
            style={styles.resourceCard}
            onPress={handleAccommodation}
          >
            <View style={styles.cardIcon}>
              <MaterialIcons name="hotel" size={36} color="#8B5CF6" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Accommodation Facility</Text>
              <Text style={styles.cardDescription}>
                Hotel and lodging information
              </Text>
              <View style={styles.badgeContainer}>
                <MaterialIcons name="public" size={14} color="#666" />
                <Text style={styles.badgeText}>Public Access</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#666" />
          </TouchableOpacity>
        </View>

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
  socialSection: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "center",
  },
  socialIcons: {
    flexDirection: "row",
    gap: 20,
  },
  socialIcon: {
    padding: 8,
  },
  headerSection: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  resourcesContainer: {
    padding: 16,
    gap: 16,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
