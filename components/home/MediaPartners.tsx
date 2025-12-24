import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MediaPartners() {
  return (
    <View style={styles.mediaSection}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>MEDIA PARTNERS</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* Pharmacy India - First and Full Width */}
      <View style={styles.pharmacyImageContainer}>
        <Image
          source={require("@/assets/images/pharmacy.png")}
          style={styles.pharmacyImage}
          resizeMode="contain"
        />
      </View>

      {/* Rest in One Row */}
      <View style={styles.mediaRow}>
        <TouchableOpacity
          style={styles.mediaImageContainerRow}
          onPress={() => Linking.openURL("https://allconferencealert.net/")}
        >
          <Image
            source={require("@/assets/images/allconferences.png")}
            style={styles.mediaImageRow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.mediaImageContainerRow}>
          <Image
            source={require("@/assets/images/infopedia.png")}
            style={styles.mediaImageRow}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    letterSpacing: 1,
  },
  titleUnderline: {
    width: 80,
    height: 3,
    backgroundColor: "#2C3E50",
    marginTop: 8,
  },
  mediaImageContainer: {
    width: "100%",
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  mediaImage: {
    width: "100%",
    height: 130,
  },
  pharmacyImageContainer: {
    width: "100%",
    marginBottom: 30,
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  pharmacyImage: {
    width: "100%",
    height: 200,
  },
  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  mediaImageContainerRow: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 5,
  },
  mediaImageRow: {
    width: "100%",
    height: 100,
  },
  abstractButton: {
    backgroundColor: "#2C3E50",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  abstractButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  sbiButton: {
    backgroundColor: "#2C3E50",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  sbiButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
