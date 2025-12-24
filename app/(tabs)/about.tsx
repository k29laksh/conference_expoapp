import Footer from "@/components/Footer";
import { checkAndPromptForUpdate } from "@/utils/updateManager";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function AboutScreen() {
  const [checking, setChecking] = useState(false);

  const handleCheckForUpdates = async () => {
    setChecking(true);
    try {
      await checkAndPromptForUpdate();
    } catch (error) {
      console.error("Error checking for updates:", error);
    } finally {
      setChecking(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            source={require("@/assets/images/about1.png")}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* About Conference */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Conference :</Text>
          <Text style={styles.paragraph}>
            MET-I-CON 2026, the 2nd International Conference on Future Trends
            and Opportunities in the Pharmaceutical World, aims to provide a
            dynamic platform for advancing pharmaceutical knowledge and
            innovation.
          </Text>
        </View>

        {/* Thrust Area */}
        <View style={styles.thrustSection}>
          <Text style={styles.thrustTitle}>THRUST AREA OF CONFERENCE</Text>
          <View style={styles.divider} />

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              AI-driven pharmaceutical innovations.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Breakthrough in nanotechnology in drug delivery.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Emerging Role of Medical Devices in the Pharma Field.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Global networking with international experts.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Panel discussion on future pharma trends.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Showcasing entrepreneurial ventures shaping the future of startups
              in pharmaceuticals.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Emerging role of diagnostic devices.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Unlocking funding avenues to drive impactful pharmaceutical
              research.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Advances in Packaging Technology.
            </Text>
          </View>
        </View>

        {/* Highlights Banner */}
        <View style={styles.highlightsBanner}>
          <Text style={styles.highlightsMainTitle}>2nd MET-I-CON 2026</Text>
          <Text style={styles.highlightsDate}>9th & 10th Jan 2026</Text>
          <View style={styles.divider} />
          <Text style={styles.highlightsSubtitle}>
            HIGHLIGHTS OF CONFERENCE
          </Text>
        </View>

        {/* Highlights List */}
        <View style={styles.section}>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Expert talk and keynote sessions—insight from global
              pharmaceutical leaders.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Poster Presentation—Showcasing Innovative Research and
              Breakthrough Ideas.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Oral Presentation—Sharing Impactful Findings with Peers and
              Experts.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Pharma Expo & Exhibition—display of cutting-edge technologies,
              products, and services.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Gala night and networking dinner—celebrate, connect, and
              collaborate.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Workshops and skill-building sessions—hands-on learning of
              advanced techniques.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              panel discussion—debating future challenges and opportunities in
              pharma.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Startup and Innovation Showcase—a platform for emerging
              entrepreneurs in healthcare.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Engaging activities to inspire young pharmacists.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              Industry-Academia Meet: building bridges for research and and
              career growth
            </Text>
          </View>
        </View>

        {/* Objectives Section */}
        <View style={styles.thrustSection}>
          <Text style={styles.thrustTitle}>OBJECTIVES</Text>
          <View style={styles.divider} />

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To provide a dynamic platform for advancing pharmaceutical
              knowledge and innovation.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To bridge the innovation gap by addressing rapid technological
              advancements in the pharmaceutical sector.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To foster future-ready skills by providing insights into emerging
              trends and opportunities.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To promote digital health integration by exploring new avenues for
              improving healthcare through innovative digital technologies.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To facilitate collaborative exchange among academicians,
              industrialists, clinical practitioners, and young pharmacists.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To catalyze new conceptions and innovative approaches within the
              pharmaceutical field.
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>■</Text>
            <Text style={styles.bulletText}>
              To showcase leading-edge research through plenary sessions and
              presentations by scientists and research scholars.
            </Text>
          </View>
        </View>

        {/* Direction to Venue */}
        <View style={styles.venueSection}>
          <View style={styles.venueContainer}>
            <View style={styles.venueTitleContainer}>
              <Text style={styles.venueTitle}>DIRECTION TO VENUE</Text>
              <View style={styles.venueDivider} />
            </View>
            <View style={styles.mapContainer}>
              <WebView
                style={styles.mapWebView}
                originWhitelist={["*"]}
                source={{
                  html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            body { margin: 0; padding: 0; height: 100vh; width: 100vw; overflow: hidden; }
            iframe { width: 100%; height: 100%; border: 0; }
          </style>
        </head>
        <body>
          <iframe 
            src="https://maps.google.com/maps?q=MET+Bhujbal+Knowledge+City+Nashik&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            allowfullscreen="" 
            loading="lazy"
          ></iframe>
        </body>
      </html>
    `,
                }}
                scrollEnabled={false}
                javaScriptEnabled={true}
              />
            </View>
          </View>
        </View>

        {/* Important Dates */}
        <View style={styles.datesSection}>
          <View style={styles.calendarIcon}>
            <Image
              source={require("@/assets/images/calendar.png")}
              style={styles.calendarImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.datesContent}>
            <Text style={styles.datesTitle}>IMPORTANT DATES</Text>
            <View style={styles.divider} />
            <View style={styles.datesList}>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  Conference Dates: 9th & 10th Jan 2026
                </Text>
              </View>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  Abstract Submission: December 25th, 2025
                </Text>
              </View>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  Intimation of Acceptance: December 28th, 2025
                </Text>
              </View>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  Final Registration for Paper Presenter: December 31st, 2025
                </Text>
              </View>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  Delegate Registration: December 31st, 2025
                </Text>
              </View>
              <View style={styles.dateItem}>
                <MaterialIcons name="arrow-right" size={24} color="#E31E24" />
                <Text style={styles.dateText}>
                  On the spot Registration (Subject to Availability): After
                  January 5th, 2026
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Check for Updates Button */}
        <View style={styles.updateSection}>
          <TouchableOpacity
            style={[
              styles.updateButton,
              checking && styles.updateButtonDisabled,
            ]}
            onPress={handleCheckForUpdates}
            disabled={checking}
          >
            <MaterialIcons
              name="system-update"
              size={20}
              color="#FFFFFF"
              style={styles.updateIcon}
            />
            <Text style={styles.updateButtonText}>
              {checking ? "Checking for Updates..." : "Check for Updates"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.updateNote}>App Version 1.0.0</Text>
        </View>

        {/* Developer Credit */}
        <View style={styles.developerSection}>
          <Text style={styles.developerText}>Developed by</Text>
          <Text style={styles.developerName}>Shubham Tech Solution</Text>
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
  heroImageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333", // Darker text
    textAlign: "justify",
  },
  thrustSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  thrustTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  divider: {
    width: 100,
    height: 4,
    backgroundColor: "#E31E24",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 12,
    paddingLeft: 10,
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 16,
    color: "#2C3E50",
    marginRight: 10,
    fontWeight: "bold",
    marginTop: 2,
  },
  bulletText: {
    fontSize: 15,
    color: "#555",
    flex: 1,
    lineHeight: 22,
  },
  highlightsBanner: {
    backgroundColor: "#fff",
    padding: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  highlightsMainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#E31E24",
  },
  highlightsDate: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    marginBottom: 15,
  },
  highlightsSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  venueSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  venueContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  venueTitleContainer: {
    width: "100%",
    alignItems: "center",
  },
  venueTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
  },
  venueDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#2C3E50",
  },
  mapContainer: {
    width: "100%",
    height: 250,
  },
  mapWebView: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  datesSection: {
    flexDirection: "column",
    padding: 20,
    alignItems: "center",
  },
  calendarIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  calendarImage: {
    width: "100%",
    height: "100%",
  },
  datesContent: {
    width: "100%",
    alignItems: "center",
    padding: 8,
  },
  datesTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
  },
  datesList: {
    marginTop: 10,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center", // Fix alignment
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333", // Darker text color
    marginLeft: 5,
    marginBottom: 2,
  },
  updateSection: {
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E31E24",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  updateButtonDisabled: {
    opacity: 0.6,
  },
  updateIcon: {
    marginRight: 8,
  },
  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  updateNote: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 10,
    textAlign: "center",
  },
  developerSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  developerText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 5,
  },
  developerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E31E24",
  },
});
