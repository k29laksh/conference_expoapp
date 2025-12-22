import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Footer from "@/components/Footer";

export default function RegistrationScreen() {
  const handleRegisterClick = () => {
    // Open registration link
    Linking.openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLSel1sMkCNZ50AU7DXslL-fi6xFOQO3kLB6xBAXaGKS0Gu3Tnw/viewform"
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>
        {/* Register Now Banner */}
        <ImageBackground
          source={require("@/assets/images/registrationbg.png")}
          style={styles.registerBanner}
          resizeMode="cover"
        >
          <Image
            source={require("@/assets/images/registernow.png")}
            style={styles.registerNowImage}
            resizeMode="contain"
          />
        </ImageBackground>

        {/* Click to Register Button */}
        <View style={styles.registerButtonContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegisterClick}
          >
            <Text style={styles.registerButtonText}>
              Click here to Register
            </Text>
          </TouchableOpacity>

          {/* Social Media Icons */}
           <View style={styles.socialIcons}>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() =>
                    Linking.openURL("https://www.youtube.com/@metiopnashik1321")
                  }
                >
                  <MaterialIcons
                    name="smart-display"
                    size={28}
                    color="#FF0000"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/people/METs-Institute-of-Pharmacy-Bhujbal-Knowledge-City-Adgaon-Nashik/100063790905651/"
                    )
                  }
                >
                  <MaterialIcons name="facebook" size={28} color="#1877F2" />
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
                    size={28}
                    color="#E4405F"
                  />
                </TouchableOpacity>
              </View>
        </View>

        {/* Registration Detail */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>REGISTRATION DETAIL</Text>
          <View style={styles.detailDivider} />

          <View style={styles.detailPoints}>
            <View style={styles.detailPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.detailText}>
                Registration fee covers day time hospitality during conference
                days*, proceedings and kit for the registered delegates.
              </Text>
            </View>
            <View style={styles.detailPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.detailText}>
                Registration fee is non-refundable and nontransferable. However,
                change in nomination can be permitted only on request.
              </Text>
            </View>
            <View style={styles.detailPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.detailText}>
                Register online for regular updates of the conference; however,
                registration will be confirmed on receipt of registration fees.
              </Text>
            </View>
          </View>
        </View>

        {/* Conference Details */}
        <View style={styles.conferenceSection}>
          <Text style={styles.conferenceTitle}>
            REGISTRATION FEES FOR PAPER PRESENTERS & DELEGATES
          </Text>
          <View style={styles.conferenceDivider} />

          <View style={styles.conferenceImageContainer}>
            <Image
              source={require("@/assets/images/i-conpaper.png")}
              style={styles.conferenceImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Payment Process */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>PAYMENT PROCESS</Text>
          <View style={styles.paymentDivider} />

          <View style={styles.paymentContainer}>
            <View style={styles.paymentInstructions}>
              <View style={styles.paymentPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.paymentText}>
                  For an auto-generated payment receipt, please proceed through
                  the SBI Collect payment gateway.
                </Text>
              </View>
              <View style={styles.paymentPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.paymentText}>
                  For payments via HDFC QR code, kindly upload the UPI payment
                  screenshot/receipt along with the transaction ID in the
                  section below.
                </Text>
              </View>
            </View>

            <View style={styles.qrSection}>
              <Image
                source={require("@/assets/images/qrcode2.png")}
                style={styles.qrCodeImage}
                resizeMode="contain"
              />

              <View style={styles.sbiCollectSection}>
                <Image
                  source={require("@/assets/images/sbicollect.png")}
                  style={styles.sbiCollectImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <Text style={styles.uploadWarning}>
            STRICTLY upload UPI payment receipt/screenshot or auto-generated
            receipt in case of SBI collect, along with the transaction ID below.
            Failure to do so will invalidate your registration.
          </Text>
        </View>

        {/* Contact Us */}
        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <Image
              source={require("@/assets/images/phone.png")}
              style={styles.phoneIcon}
              resizeMode="contain"
            />
            <Text style={styles.contactTitle}>CONTACT US</Text>
            <View style={styles.contactDivider} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactAddress}>
                MET&apos;s Institute of Pharmacy, Bhujbal Knowledge City,
                Adgaon, Nashik, Maharashtra, India-03
              </Text>

              <Text style={styles.contactLabel}>
                Convener: Dr. Sanjay J. Kshirsagar,
              </Text>
              <Text style={styles.contactLabel}>Organizing Secretary:</Text>

              <View style={styles.contactPerson}>
                <Text style={styles.bullet}>■</Text>
                <Text style={styles.contactName}>
                  Dr. Santosh S. Chhajed |{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("mailto:Santoshc_iop@bkc.met.edu")
                  }
                >
                  <Text style={styles.contactEmail}>
                    Santoshc_iop@bkc.met.edu
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contactPerson}>
                <Text style={styles.bullet}>■</Text>
                <Text style={styles.contactName}>Dr. Sachin S. Gaikwad | </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("mailto:Saching_iop@bkc.met.edu")
                  }
                >
                  <Text style={styles.contactEmail}>
                    Saching_iop@bkc.met.edu
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contactPerson}>
                <Text style={styles.bullet}>■</Text>
                <Text style={styles.contactName}>
                  Dr. Deepak S. Bhambere |{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL("mailto:Deepaks_iop@bkc.met.edu")
                  }
                >
                  <Text style={styles.contactEmail}>
                    Deepaks_iop@bkc.met.edu
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Social Media Icons */}
              <View style={styles.socialIcons}>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() =>
                    Linking.openURL("https://www.youtube.com/@metiopnashik1321")
                  }
                >
                  <MaterialIcons
                    name="smart-display"
                    size={28}
                    color="#FF0000"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialIcon}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.facebook.com/people/METs-Institute-of-Pharmacy-Bhujbal-Knowledge-City-Adgaon-Nashik/100063790905651/"
                    )
                  }
                >
                  <MaterialIcons name="facebook" size={28} color="#1877F2" />
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
                    size={28}
                    color="#E4405F"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  registerBanner: {
    width: "100%",
    height: 380,
    justifyContent: "center",
    alignItems: "center",
  },
  registerNowImage: {
    width: "90%",
    height: 250,
  },
  registerButtonContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#2C3E50",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 15,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  detailSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
  },
  detailDivider: {
    width: 100,
    height: 3,
    backgroundColor: "#2C3E50",
    alignSelf: "center",
    marginBottom: 20,
  },
  detailPoints: {
    marginTop: 10,
  },
  detailPoint: {
    flexDirection: "row",
    marginBottom: 15,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    color: "#2C3E50",
    marginRight: 8,
    fontWeight: "bold",
    marginTop: 2,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  conferenceSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  conferenceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
  },
  conferenceDivider: {
    width: 100,
    height: 3,
    backgroundColor: "#2C3E50",
    alignSelf: "center",
    marginBottom: 20,
  },
  conferenceImageContainer: {
    width: "100%",
  },
  conferenceImage: {
    width: "100%",
    height: 600,
  },
  paymentSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  paymentTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
    marginBottom: 10,
  },
  paymentDivider: {
    width: 100,
    height: 3,
    backgroundColor: "#2C3E50",
    alignSelf: "center",
    marginBottom: 20,
  },
  paymentContainer: {
    marginTop: 10,
  },
  paymentInstructions: {
    marginBottom: 20,
  },
  paymentPoint: {
    flexDirection: "row",
    marginBottom: 12,
    paddingRight: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    lineHeight: 19,
  },
  qrSection: {
    flexDirection: "column",
    gap: 30,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  qrCodeImage: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  sbiCollectSection: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  sbiCollectImage: {
    width: "100%",
    height: 150,
  },
  uploadWarning: {
    fontSize: 13,
    color: "#E31E24",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  contactHeader: {
    flexDirection: "column",
    alignItems: "center",
  },
  phoneIcon: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  contactInfo: {
    width: "100%",
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
    textAlign: "center",
  },
  contactDivider: {
    width: 100,
    height: 3,
    backgroundColor: "#2C3E50",
    marginBottom: 20,
  },
  contactAddress: {
    fontSize: 13,
    color: "#555",
    marginBottom: 12,
    lineHeight: 19,
  },
  contactLabel: {
    fontSize: 13,
    color: "#555",
    marginBottom: 5,
  },
  contactPerson: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  contactName: {
    fontSize: 13,
    color: "#555",
  },
  contactEmail: {
    fontSize: 13,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  contactSocialIcons: {
    flexDirection: "row",
    gap: 15,
    marginTop: 15,
    justifyContent: "center",
  },
  contactSocialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
