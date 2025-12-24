import Footer from "@/components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
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
  designation: string;
  organization: string;
  phone: string;
  interests: string[];
}

// Sample registered candidates data
const registeredCandidates: Candidate[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    designation: "Professor",
    organization: "IIT Mumbai",
    phone: "919876543210",
    interests: ["Pharmaceutical Chemistry", "Drug Development"],
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    designation: "Research Scientist",
    organization: "CSIR-NCL Pune",
    phone: "919876543211",
    interests: ["Quality Assurance", "Regulatory Affairs"],
  },
  {
    id: "3",
    name: "Dr. Amit Patel",
    designation: "Associate Professor",
    organization: "NIPER Ahmedabad",
    phone: "919876543212",
    interests: ["Pharmacology", "Clinical Research"],
  },
  {
    id: "4",
    name: "Dr. Sneha Desai",
    designation: "Head of Department",
    organization: "Mumbai University",
    phone: "919876543213",
    interests: ["Pharmaceutics", "Novel Drug Delivery"],
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    designation: "Senior Scientist",
    organization: "Sun Pharma",
    phone: "919876543214",
    interests: ["Process Development", "Manufacturing"],
  },
  {
    id: "6",
    name: "Dr. Anjali Mehta",
    designation: "Assistant Professor",
    organization: "Delhi Pharmaceutical Sciences",
    phone: "919876543215",
    interests: ["Herbal Medicine", "Natural Products"],
  },
];

export default function NetworkingScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] =
    useState(registeredCandidates);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCandidates(registeredCandidates);
    } else {
      const filtered = registeredCandidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(query.toLowerCase()) ||
          candidate.designation.toLowerCase().includes(query.toLowerCase()) ||
          candidate.organization.toLowerCase().includes(query.toLowerCase()) ||
          candidate.interests.some((interest) =>
            interest.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredCandidates(filtered);
    }
  };

  const openWhatsApp = async (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Hello ${name}, I am attending MET-I-CON 2025. I would like to connect with you for networking.`
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
      "Join our MET-I-CON 2025 networking group to connect with all participants!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Join Group",
          onPress: async () => {
            // Replace with your actual WhatsApp group link
            const groupLink =
              "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK";
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

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
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
            placeholder="Search by name, organization, or interests..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <MaterialIcons name="close" size={24} color="#757779ff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Participants Count */}
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {filteredCandidates.length}{" "}
            {filteredCandidates.length === 1 ? "Participant" : "Participants"}
          </Text>
        </View>

        {/* Candidates List */}
        <View style={styles.candidatesList}>
          {filteredCandidates.map((candidate) => (
            <View key={candidate.id} style={styles.candidateCard}>
              <View style={styles.candidateInfo}>
                <View style={styles.avatarContainer}>
                  <MaterialIcons name="person" size={32} color="#EF4444" />
                </View>

                <View style={styles.candidateDetails}>
                  <Text style={styles.candidateName}>{candidate.name}</Text>
                  <Text style={styles.candidateDesignation}>
                    {candidate.designation}
                  </Text>
                  <Text style={styles.candidateOrganization}>
                    {candidate.organization}
                  </Text>

                  <View style={styles.interestsContainer}>
                    {candidate.interests.map((interest, index) => (
                      <View key={index} style={styles.interestTag}>
                        <Text style={styles.interestText}>{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => openWhatsApp(candidate.phone, candidate.name)}
              >
                <MaterialIcons name="chat" size={20} color="#FFFFFF" />
                <Text style={styles.whatsappButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {filteredCandidates.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No participants found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search
            </Text>
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
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
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
  },
  candidateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  candidateInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  candidateDetails: {
    flex: 1,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  candidateDesignation: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 2,
  },
  candidateOrganization: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
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
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
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
