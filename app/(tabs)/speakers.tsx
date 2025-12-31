import Footer from "@/components/Footer";
import { getSessionsForSpeaker } from "@/constants/scheduleData";
import { sessionStorage } from "@/utils/sessionStorage";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Speaker {
  name: string;
  title: string;
  organization: string;
  country: string;
  imageUri: any;
  day: string;
  time: string;
  sessionTitle: string;
  bio: string;
  topics: string[];
  linkedIn?: string;
}

const speakers: Speaker[] = [
  {
    name: "Dr. Zyta Ziora",
    title: "Lecturer in Biotechnology Program",
    organization:
      "IITC Institute for Molecular Bioscience, The University of Queensland",
    country: "Australia",
    imageUri: require("@/assets/images/zyta.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 10:00 to 12:00",
    sessionTitle:
      "Natural non-antibiotic antimicrobials for the skincare treatment",
    bio: "Dr. Zyta Ziora is a distinguished researcher specializing in antimicrobial compounds and their therapeutic applications. Her groundbreaking work focuses on developing natural alternatives to traditional antibiotics.",
    topics: ["Antimicrobials", "Skincare", "Biotechnology", "Natural Products"],
    linkedIn:
      "https://www.linkedin.com/in/zyta-ziora?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Kim Seok-ho",
    title: "Professor, College of Pharmacy",
    organization: "Kangwon National University",
    country: "South Korea",
    imageUri: require("@/assets/images/kim.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 10:00 to 12:00",
    sessionTitle:
      "Discovery of an ERRg agonist as a therapeutic for neurological disease",
    bio: "Prof. Dr. Kim Seok-ho is an expert in pharmaceutical sciences with focus on neurological disease therapeutics. His research has contributed significantly to drug discovery in neurology.",
    topics: ["Neurology", "Drug Discovery", "Therapeutics", "Pharmacology"],
    linkedIn: "",
  },
  {
    name: "Dr. Abdi Wira Septama",
    title: "Research Scientist",
    organization: "National Research and Innovation Agency (BRIN)",
    country: "Indonesia",
    imageUri: require("@/assets/images/abdi.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 10:00 to 12:00",
    sessionTitle:
      "Natural Product as an Alternative Source to Overcome Antimicrobial Resistance Problem (AMR)",
    bio: "Dr. Abdi Wira Septama is a leading researcher in natural products and antimicrobial resistance. His work focuses on discovering novel compounds from natural sources to combat AMR.",
    topics: ["AMR", "Natural Products", "Phytotherapy", "Drug Resistance"],
    linkedIn:
      "https://www.linkedin.com/in/abdi-wira-septama-8542075a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Kailas Kalicharan Moravkar",
    title: "Principal, Research Engineer",
    organization: "Regeneron Inc.",
    country: "South Korea",
    imageUri: require("@/assets/images/kailash.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 02:00 to 03:00",
    sessionTitle:
      "Hot Melt Extrusion (HME) as an Emerging Frontiers Platform for Future-Ready Drug Delivery Systems",
    bio: "Dr. Kailas Moravkar specializes in advanced drug delivery systems with expertise in Hot Melt Extrusion technology. His innovations have revolutionized pharmaceutical manufacturing processes.",
    topics: ["Drug Delivery", "HME", "Pharmaceutics", "Manufacturing"],
    linkedIn:
      "https://www.linkedin.com/in/kailas-k-moravkar-phd-tech-pharm-994b5725?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Prof. Rakesh K. Tekade",
    title: "Associate Dean (R&D), Professor and Head",
    organization: "Department of Pharmaceutics, NIPER-Ahmedabad",
    country: "India",
    imageUri: require("@/assets/images/rakesh.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 02:00 to 03:00",
    sessionTitle:
      "Targeting cancer cells via Next-generation technological advances",
    bio: "Prof. Rakesh K. Tekade is a renowned pharmaceutical scientist and educator. His research in cancer therapeutics and nanotechnology has earned international recognition.",
    topics: ["Cancer Research", "Nanotechnology", "Drug Targeting", "Oncology"],
    linkedIn:
      "https://www.linkedin.com/in/dr-rakesh-tekade-21109612?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Suchita Lokhande",
    title: "Scientist D",
    organization: "Department of Science & Technology, Government of India",
    country: "India",
    imageUri: require("@/assets/images/suchita.png"),
    day: "Day-I",
    time: "09th January, 2026, Friday 02:00 to 03:00",
    sessionTitle: "Government of India Funding Opportunities for Researchers",
    bio: "Dr. Suchita Lokhande is a distinguished Scientist D at the Department of Science & Technology, Government of India. She specializes in guiding researchers through funding opportunities and grant applications.",
    topics: ["Research Funding", "Government Grants", "Science Policy", "R&D"],
    linkedIn: "",
  },
  {
    name: "Dr. Sachin Kushare",
    title: "Research Scientist",
    organization: "Glenmark Pharmaceuticals, Sinner",
    country: "India",
    imageUri: require("@/assets/images/sachin.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 10:00 to 11:00",
    sessionTitle:
      "The Intelligent Future: AI, Digital Health, and the 2030 Pharma Blueprint",
    bio: "Dr. Sachin Kushare is at the forefront of AI integration in pharmaceutical research. His work bridges technology and healthcare for future-ready solutions.",
    topics: ["AI", "Digital Health", "Pharma Innovation", "Technology"],
    linkedIn:
      "https://www.linkedin.com/in/dr-sachin-kushare-44811734?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Mr. Sharad Chandak",
    title: "Packaging Head",
    organization: "Glenmark Pharmaceuticals, Sinner",
    country: "India",
    imageUri: require("@/assets/images/sharad.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 10:00 to 11:00",
    sessionTitle: "Advancements in Respiratory Devices",
    bio: "Mr. Sharad Chandak is an expert in pharmaceutical packaging and respiratory device technology. His innovations have improved patient compliance and drug delivery efficiency.",
    topics: [
      "Respiratory Devices",
      "Packaging",
      "Medical Devices",
      "Innovation",
    ],
    linkedIn:
      "https://www.linkedin.com/in/sharad-chandak-24016aba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Nilesh Prakash Nirmal",
    title: "Global Talent Scientist, Institute of Nutrition",
    organization: "Mahidol University Salaya",
    country: "Bangkok, Thailand",
    imageUri: require("@/assets/images/nilesh.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 11:00 to 12:00",
    sessionTitle:
      "Phenolic compounds extraction from fruit waste/byproducts and their nutraceutical applications",
    bio: "Dr. Nilesh Nirmal is a nutrition scientist focused on sustainable extraction of bioactive compounds. His research promotes waste valorization in the food and pharmaceutical industries.",
    topics: [
      "Nutraceuticals",
      "Phytotherapy",
      "Waste Valorization",
      "Nutrition",
    ],
    linkedIn:
      "https://www.linkedin.com/in/nilesh-nirmal-65461a70?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Dr. Manoj Chitnis",
    title: "Vice President",
    organization: "J B Chemicals & Pharmaceutical Ltd.",
    country: "Mumbai",
    imageUri: require("@/assets/images/manoj.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 11:00 to 12:00",
    sessionTitle: "Pharmaceutical quality system",
    bio: "Dr. Manoj Chitnis is a quality systems expert with extensive industry experience. He has led numerous quality initiatives in pharmaceutical manufacturing.",
    topics: ["Quality Systems", "GMP", "Regulatory Affairs", "Manufacturing"],
    linkedIn:
      "https://www.linkedin.com/in/manoj-chitnis-63190515?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "Prof. Dr. Javed Ali",
    title: "Dept of Pharmaceutics",
    organization: "Jamia Hamdard University",
    country: "New Delhi",
    imageUri: require("@/assets/images/javed.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 12:00 to 01:00",
    sessionTitle:
      "Strategic Combinatorial Approach for Enhanced Bioavailability of Antiretroviral in HIV-1 Viral Reservoirs",
    bio: "Prof. Dr. Javed Ali is a distinguished pharmaceutics expert specializing in HIV therapeutics. His combinatorial approaches have significantly improved drug delivery for antiretroviral therapy.",
    topics: ["HIV", "Antiretroviral", "Drug Delivery", "Pharmaceutics"],
    linkedIn: "",
  },
  {
    name: "Dr. J. S. Wagh",
    title: "Ex Service Director (1999-2024)",
    organization: "Waters India Pvt. Ltd., Mumbai",
    country: "India",
    imageUri: require("@/assets/images/jswagh.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 12:00 to 01:00",
    sessionTitle:
      "GLP Audit Readiness and Laboratory Productivity for pharma QC lab- Options and Way Forward",
    bio: "Dr. J. S. Wagh brings decades of laboratory quality control experience. His expertise in GLP compliance and audit readiness has guided numerous pharmaceutical laboratories.",
    topics: ["GLP", "Quality Control", "Laboratory Management", "Audit"],
    linkedIn: "",
  },
  {
    name: "Dr. Dinesh Jagtap",
    title: "Scientific Officer",
    organization: "RGSTC, Government of Maharashtra",
    country: "India",
    imageUri: require("@/assets/images/dinesh.png"),
    day: "Day-II",
    time: "10th January, 2026, Saturday 02:00 to 03:00",
    sessionTitle:
      "Unlocking Research Potential: How to Identify opportunities and Apply for RGSTC Funding",
    bio: "Dr. Dinesh Jagtap is a Scientific Officer at the Rajiv Gandhi Science and Technology Commission (RGSTC), Government of Maharashtra. He specializes in research funding opportunities and helping researchers navigate the application process for RGSTC grants.",
    topics: ["Research Funding", "RGSTC", "Grant Applications", "Maharashtra"],
    linkedIn:
      "https://www.linkedin.com/in/dinesh-jagtap-96a18a260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

export default function SpeakersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [savedSpeakers, setSavedSpeakers] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Initialize storage
    const initStorage = async () => {
      await sessionStorage.initialize();
      const saved = sessionStorage.getSavedSpeakers();
      setSavedSpeakers(new Set(saved.map((s) => s.speakerName)));
    };

    initStorage();

    // Subscribe to session storage changes
    const updateSavedSpeakers = () => {
      const saved = sessionStorage.getSavedSpeakers();
      setSavedSpeakers(new Set(saved.map((s) => s.speakerName)));
    };

    const unsubscribe = sessionStorage.subscribe(updateSavedSpeakers);

    return () => unsubscribe();
  }, []);

  const handleToggleBookmark = async (speaker: Speaker) => {
    const speakerSession = {
      id: `speaker-${speaker.name}`,
      speakerName: speaker.name,
      sessionTitle: speaker.sessionTitle,
      time: speaker.time,
      day: speaker.day,
    };

    // Get all schedule sessions for this speaker
    const linkedSessions = getSessionsForSpeaker(speaker.name);
    const linkedSessionsWithDay = linkedSessions.map((session) => ({
      ...session,
      day: session.id.startsWith("day1-") ? 1 : 2,
    }));

    const isSaved = await sessionStorage.toggleSpeaker(
      speakerSession,
      linkedSessionsWithDay
    );

    Alert.alert(
      isSaved ? "Added to My Schedule" : "Removed from My Schedule",
      isSaved
        ? `${speaker.name}'s session has been added to your personal schedule.`
        : `${speaker.name}'s session has been removed from your personal schedule.`,
      [{ text: "OK" }]
    );
  };

  // Filter speakers based on search
  const filteredSpeakers = speakers.filter((speaker) => {
    const matchesSearch =
      searchQuery === "" ||
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesSearch;
  });

  const openLinkedIn = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Eminent Experts</Text>
          <View style={styles.divider} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, topic, or organization..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#999"
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialIcons name="clear" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results Count */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsText}>
            {filteredSpeakers.length}{" "}
            {filteredSpeakers.length === 1 ? "Expert" : "Experts"} Found
          </Text>
        </View>

        {/* Speakers List */}
        <View style={styles.section}>
          {filteredSpeakers.map((speaker, index) => (
            <View key={index} style={styles.speakerCard}>
              {/* Bookmark Button */}
              <TouchableOpacity
                style={styles.speakerBookmarkButton}
                onPress={() => handleToggleBookmark(speaker)}
              >
                <MaterialIcons
                  name={
                    savedSpeakers.has(speaker.name)
                      ? "bookmark"
                      : "bookmark-border"
                  }
                  size={28}
                  color={savedSpeakers.has(speaker.name) ? "#EF4444" : "#666"}
                />
              </TouchableOpacity>

              {/* Speaker Image and Basic Info */}
              <View style={styles.speakerHeader}>
                {speaker.imageUri ? (
                  <Image
                    source={speaker.imageUri}
                    style={styles.speakerImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.speakerImagePlaceholder}>
                    <MaterialIcons name="person" size={40} color="#999" />
                  </View>
                )}
                <View style={styles.speakerBasicInfo}>
                  <Text style={styles.speakerName}>{speaker.name}</Text>
                  <Text style={styles.speakerTitle}>{speaker.title}</Text>
                  <Text style={styles.speakerOrg}>{speaker.organization}</Text>
                  {speaker.linkedIn && (
                    <TouchableOpacity
                      style={styles.linkedInButton}
                      onPress={() => openLinkedIn(speaker.linkedIn)}
                    >
                      <MaterialCommunityIcons
                        name="linkedin"
                        size={20}
                        color="#0077B5"
                      />
                      <Text style={styles.linkedInText}>View LinkedIn</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Session Details */}
              <View style={styles.sessionSection}>
                <View style={styles.sessionHeader}>
                  <MaterialIcons name="event" size={18} color="#E31E24" />
                  <Text style={styles.sessionHeaderText}>Session Details</Text>
                </View>
                <View style={styles.dayTimeBadge}>
                  <MaterialIcons name="calendar-today" size={14} color="#fff" />
                  <Text style={styles.dayTimeText}>
                    {speaker.day} • {speaker.time}
                  </Text>
                </View>
                <Text style={styles.sessionTitle}>{speaker.sessionTitle}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* No Results Message */}
        {filteredSpeakers.length === 0 && (
          <View style={styles.noResultsSection}>
            <MaterialIcons name="search-off" size={64} color="#ccc" />
            <Text style={styles.noResultsText}>No experts found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search
            </Text>
          </View>
        )}

        {/* Speaker Footer Image */}
        {filteredSpeakers.length > 0 && (
          <View style={styles.speakerFooterSection}>
            <Image
              source={require("@/assets/images/speakerfooterimage.png")}
              style={styles.speakerFooterImage}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <MaterialIcons name="event" size={48} color="#E31E24" />
          <Text style={styles.ctaTitle}>Join Us at MET-I-CON 2026</Text>
          <Text style={styles.ctaText}>
            Don&apos;t miss this opportunity to learn from the best minds in
            pharmaceutical sciences. Register now to secure your spot!
          </Text>
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
  headerSection: {
    backgroundColor: "#E31E24",
    padding: 30,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  divider: {
    width: 100,
    height: 4,
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 2,
  },
  searchSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  resultsText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  section: {
    padding: 20,
    backgroundColor: "#fff",
  },
  speakerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "relative",
  },
  speakerBookmarkButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speakerHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  speakerImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 15,
    borderWidth: 3,
    borderColor: "#E31E24",
    overflow: "hidden",
  },
  speakerImagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 3,
    borderColor: "#e0e0e0",
  },
  speakerBasicInfo: {
    flex: 1,
    justifyContent: "center",
  },
  speakerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E31E24",
    marginBottom: 4,
  },
  speakerTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 3,
    flexWrap: "wrap",
  },
  speakerOrg: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  countryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  countryText: {
    fontSize: 12,
    color: "#E31E24",
    fontWeight: "600",
  },
  linkedInButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
  },
  linkedInText: {
    fontSize: 12,
    color: "#0077B5",
    fontWeight: "600",
  },
  sessionSection: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  sessionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sessionHeaderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E31E24",
    textTransform: "uppercase",
  },
  dayTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E31E24",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  dayTimeText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
    lineHeight: 22,
  },
  bioSection: {
    marginBottom: 15,
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 6,
  },
  bioText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 21,
  },
  topicsSection: {
    marginTop: 5,
  },
  topicsLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicBadge: {
    backgroundColor: "#FFF5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E31E24",
  },
  topicBadgeText: {
    fontSize: 12,
    color: "#E31E24",
    fontWeight: "600",
  },
  noResultsSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#999",
    marginTop: 15,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
  speakerFooterSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  speakerFooterImage: {
    width: "100%",
    height: 200,
  },
  ctaSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f8f9fa",
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E31E24",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});
