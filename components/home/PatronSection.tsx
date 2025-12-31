import { Image, StyleSheet, Text, View } from "react-native";

const patronData = [
  {
    name: "Hon. Shri Chhagan Bhujbal",
    role: "Chairman, MET, Bhujbal Knowledge City",
    image: require("@/assets/images/chaggan.png"),
  },
  {
    name: "Hon. Shri. Samir Bhujbal",
    role: "Trustee, MET, Bhujbal Knowledge City",
    image: require("@/assets/images/samir.png"),
  },
  {
    name: "Hon. Shri. Pankaj Bhujbal",
    role: "Trustee, MET, Bhujbal Knowledge City",
    image: require("@/assets/images/pankaj.png"),
  },
  {
    name: "Hon. Dr. Shefali Bhujbal",
    role: "Chief Administrator, MET, Bhujbal Knowledge City",
    image: require("@/assets/images/shefali.png"),
  },
];

export default function PatronSection() {
  return (
    <View style={styles.patronSection}>
      <View style={styles.patronHeaderContainer}>
        <View style={styles.patronLine} />
        <View style={styles.patronBadge}>
          <Text style={styles.patronText}>Patron</Text>
        </View>
        <View style={styles.patronLine} />
      </View>

      <View style={styles.patronGrid}>
        {/* First patron - larger card with vertical layout */}
        <View style={styles.featuredPatronCard}>
          <Image
            source={patronData[0].image}
            style={styles.featuredImage}
            imageStyle={styles.featuredImageStyle}
            resizeMode="cover"
          />
          <View style={styles.featuredInfo}>
            <Text style={styles.featuredName}>{patronData[0].name}</Text>
            <Text style={styles.featuredRole}>{patronData[0].role}</Text>
          </View>
        </View>

        {/* Rest of the patrons - horizontal layout */}
        {patronData.slice(1).map((patron, index) => (
          <View key={index} style={styles.patronCard}>
            <Image
              source={patron.image}
              style={styles.personImage}
              imageStyle={styles.personImageStyle}
              resizeMode="cover"
            />
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{patron.name}</Text>
              <Text style={styles.personRole}>{patron.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  patronSection: {
    marginBottom: 20,
  },
  patronHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  patronLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E31E24",
  },
  patronBadge: {
    backgroundColor: "#E31E24",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  patronText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  patronGrid: {
    marginBottom: 20,
  },
  featuredPatronCard: {
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#E31E24",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    marginBottom: 12,
  },
  featuredImageStyle: {
    marginTop: -10,
  },
  featuredInfo: {
    alignItems: "center",
  },
  featuredName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  featuredRole: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 17,
  },
  patronCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  personImageStyle: {
    marginTop: -80,
  },
  personInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  personName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  personRole: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
});
