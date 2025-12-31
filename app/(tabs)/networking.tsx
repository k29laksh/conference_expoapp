import candidatesData from "@/assets/registeredCandidates.json";
import Footer from "@/components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Candidate {
  id: string;
  name: string;
  institute: string;
  email: string;
  phone: string;
  country: string;
  university: string;
  areaOfResearch: string;
}

const VALID_AREAS_OF_RESEARCH = [
  "Pharmaceutics",
  "Pharmaceutical Chemistry",
  "Pharmacology",
  "Pharmacognosy",
  "Pharmaceutical Analysis",
  "Pharmaceutical regulatory affairs",
];

const normalizeAreaOfResearch = (area: string): string => {
  if (!area) return "Other";
  
  // Check if the area exactly matches one of the valid areas (case-insensitive)
  const normalizedArea = VALID_AREAS_OF_RESEARCH.find(
    validArea => validArea.toLowerCase() === area.toLowerCase()
  );
  
  return normalizedArea || "Other";
};

export default function NetworkingScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [registeredCandidates, setRegisteredCandidates] = useState<Candidate[]>(
    []
  );
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

  // Load and auto-generate IDs for candidates
  useEffect(() => {
    const candidatesWithIds = candidatesData.map((candidate, index) => ({
      ...candidate,
      id: `METICON-${String(index + 1).padStart(4, "0")}`,
      areaOfResearch: normalizeAreaOfResearch(candidate.areaOfResearch),
    }));
    setRegisteredCandidates(candidatesWithIds);
    setFilteredCandidates(candidatesWithIds);
  }, []);

  // Filter candidates whenever search query or registered candidates change
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === "") {
      setFilteredCandidates(registeredCandidates);
      return;
    }

    const searchLower = trimmedQuery.toLowerCase();
    const filtered = registeredCandidates.filter((candidate) => {
      return (
        candidate.name?.toLowerCase().includes(searchLower) ||
        candidate.institute?.toLowerCase().includes(searchLower) ||
        candidate.email?.toLowerCase().includes(searchLower) ||
        candidate.university?.toLowerCase().includes(searchLower) ||
        candidate.areaOfResearch?.toLowerCase().includes(searchLower) ||
        candidate.country?.toLowerCase().includes(searchLower) ||
        candidate.phone?.includes(trimmedQuery) ||
        candidate.id?.toLowerCase().includes(searchLower)
      );
    });

    setFilteredCandidates(filtered);
  }, [searchQuery, registeredCandidates]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const openWhatsApp = async (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Hello ${name}, I am attending MET-I-CON 2026. I would like to connect with you for networking.`
    );
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on your device");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open WhatsApp");
      console.error("WhatsApp error:", error);
    }
  };

  const createWhatsAppGroup = async () => {
    Alert.alert(
      "WhatsApp Group",
      "Join our MET-I-CON 2026 networking group to connect with all participants!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Join Group",
          onPress: async () => {
            const groupLink =
              "https://chat.whatsapp.com/Ccga2DRpzp3HHxAWAmdFwS";
            try {
              const canOpen = await Linking.canOpenURL(groupLink);
              if (canOpen) {
                await Linking.openURL(groupLink);
              } else {
                Alert.alert("Error", "Unable to open WhatsApp group link");
              }
            } catch (error) {
              Alert.alert("Error", "Unable to open WhatsApp group");
              console.error("WhatsApp group error:", error);
            }
          },
        },
      ]
    );
  };

  const renderCandidateCard = ({ item: candidate }: { item: Candidate }) => (
    <View style={styles.candidateCard}>
      {/* Header with Avatar and Name */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {candidate.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.candidateName}>{candidate.name}</Text>
          <View style={styles.researchBadge}>
            <MaterialIcons name="science" size={12} color="#EF4444" />
            <Text style={styles.researchText}>{candidate.areaOfResearch}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <MaterialIcons name="business" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{candidate.institute}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="school" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{candidate.university}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="public" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{candidate.country}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="email" size={16} color="#6B7280" />
          <Text style={styles.detailTextEmail}>{candidate.email}</Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={() => openWhatsApp(candidate.phone, candidate.name)}
      >
        <MaterialIcons name="chat" size={20} color="#FFFFFF" />
        <Text style={styles.whatsappButtonText}>Connect via WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );

  const renderListHeader = () => (
    <View style={styles.countContainer}>
      <Text style={styles.countText}>
        {filteredCandidates.length}{" "}
        {filteredCandidates.length === 1 ? "Participant" : "Participants"}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="search-off" size={64} color="#ccc" />
      <Text style={styles.emptyStateText}>No participants found</Text>
      <Text style={styles.emptyStateSubtext}>Try adjusting your search</Text>
    </View>
  );

  const renderListFooter = () => <Footer />;

  const keyExtractor = (item: Candidate) => item.id;

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      {/* Header Section */}
      <View style={styles.header}>
        <MaterialIcons name="people" size={32} color="#EF4444" />
        <Text style={styles.headerTitle}>Networking Hub</Text>
        <Text style={styles.headerSubtitle}>
          Connect with fellow participants via WhatsApp
        </Text>
      </View>

      {/* WhatsApp Group Button */}
      <TouchableOpacity
        style={styles.groupButton}
        onPress={createWhatsAppGroup}
      >
        <MaterialIcons name="group-add" size={24} color="#FFFFFF" />
        <Text style={styles.groupButtonText}>Join WhatsApp Group</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={24}
          color="#757779ff"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, institute, or email..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialIcons name="close" size={24} color="#757779ff" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={styles.container}
        data={filteredCandidates}
        renderItem={renderCandidateCard}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.candidatesList}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  groupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 8,
  },
  countContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  candidatesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  candidateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 0,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerInfo: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
  },
  researchBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    alignSelf: "flex-start",
  },
  researchText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#DC2626",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  detailsSection: {
    padding: 16,
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  detailTextEmail: {
    flex: 1,
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  interestTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  interestText: {
    fontSize: 12,
    color: "#92400E",
    fontWeight: "500",
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25D366",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
    shadowColor: "#25D366",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  whatsappButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#9CA3AF",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#D1D5DB",
    marginTop: 4,
  },
});
