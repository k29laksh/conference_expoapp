import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import EventCarousel from '@/components/home/EventCarousel';
import MediaPartners from '@/components/home/MediaPartners';
import NashikGlimpses from '@/components/home/NashikGlimpses';
import PatronSection from '@/components/home/PatronSection';
import Footer from '@/components/Footer';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isThrustAreaExpanded, setIsThrustAreaExpanded] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;


  const heightInterpolate = animationHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400], // Adjust based on content height
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // const programsList = [
  //   'D. Pharmacy',
  //   'B. Pharmacy',
  //   'M. Pharmacy (Pharmaceutics, Quality Assurance, Pharmaceutical Chemistry, Pharmacology, Pharmaceutical Regulatory Affairs)',
  //   'Ph.D. in Pharmacy'
  // ];

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <ScrollView style={styles.container}>

     
      <EventCarousel />

      {/* Programs Offered
      <View style={styles.programsSection}>
        {programsList.map((program, index) => (
          <View key={index} style={styles.programCard}>
            <Text style={styles.programText}>{program}</Text>
          </View>
        ))}
      </View>

      <View style={styles.organizerSection}>
        <Text style={styles.organizerLabel}>Organized by</Text>
        <Text style={styles.organizerTitle}>INSTITUTE OF PHARMACY</Text>
      </View> */}

      {/* Contact Info */}
      {/* <View style={styles.contactSection}>
        <View style={styles.contactCard}>
          <MaterialIcons name="location-on" size={20} color="#E31E24" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactText}>Adgaon, Nashik - 422003, Maharashtra (India)</Text>
          </View>
        </View>
        <View style={styles.contactCard}>
          <MaterialIcons name="phone" size={20} color="#E31E24" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactText}>Tel.: (0253) 2303515, 2555861</Text>
          </View>
        </View>
        <View style={styles.contactCard}>
          <MaterialIcons name="print" size={20} color="#E31E24" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactText}>Telefax: (0253) 2303267</Text>
          </View>
        </View>
        <View style={styles.contactCard}>
          <MaterialIcons name="language" size={20} color="#E31E24" />
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactText}>www.metbhujbalknowledgecity.ac.in</Text>
          </View>
        </View>
      </View> */}

      <MediaPartners />


      {/* At a Glance Image */}
      <View style={styles.glanceSection}>
        <Image 
          source={require('@/assets/images/ataglance.png')}
          style={styles.glanceImage}
          resizeMode="contain"
        />
      </View>

      {/* Thrust Area */}
      <View style={styles.thrustSection}>        
        <PatronSection />

        {/* Convener */}
        <View style={styles.convenerSection}>
          <Text style={styles.convenerLabel}>Convener: Dr. Sanjay J. Kshirsagar, Principal</Text>
          <Text style={styles.convenerLabel}>Advisors:</Text>
          <Text style={styles.advisorText}>Dr. Deepak S. Bhambere : 9764222761</Text>
          <Text style={styles.advisorText}>Dr. Santosh S. Chhajed : 9923117500</Text>
          <Text style={styles.advisorText}>Dr. Sachin S. Gajbiye : 9860070924</Text>
        </View>

        {/* Venue */}
        <View style={styles.venueSection}>
          <View style={styles.venueHeaderContainer}>
            <View style={styles.venueLine} />
            <View style={styles.venueBadge}>
              <Text style={styles.venueText}>Venue</Text>
            </View>
            <View style={styles.venueLine} />
          </View>
          <Text style={styles.venueName}>Mumbai Educational Trust, Bhujbal Knowledge City</Text>
          <Text style={styles.venueAddress}>Adgaon, Nashik, Maharashtra, India-03</Text>
        </View>
      </View>

      <NashikGlimpses />
<View style={styles.programsDetailSection}>
  <View style={styles.divider} />
</View>
      {/* Programs Offered Detail */}
      <View style={styles.programsDetailSection}>
        <Text style={styles.sectionTitle}>Programs Offered:</Text>
        
        <Text style={styles.programDetail}>
          D. Pharmacy | B. Pharmacy | M. Pharmacy (Pharmaceutics, Quality Assurance, 
          Pharmaceutical Chemistry, Pharmacology, Pharmaceutical Regulatory Affairs) | 
          Ph.D. in Pharmacy.
        </Text>
      </View>
<View style={styles.programsDetailSection}>
  <View style={styles.divider} />
</View>
     

      <Footer />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  registerButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  clickToRegisterButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clickToRegisterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  heroBanner: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E31E24',
    textAlign: 'center',
  },
  superscript: {
    fontSize: 20,
    lineHeight: 20,
  },
  heroYear: {
    color: '#333',
  },
  heroDate: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  themeSection: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  themeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
    textAlign: 'center',
  },
  affiliationsSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  logosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  logoPlaceholder: {
    width: (width - 60) / 2,
    height: 80,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  programsSection: {
    padding: 15,
    backgroundColor: '#fff',
  },
  programCard: {
    backgroundColor: '#5A5A5A',
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  programText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  organizerSection: {
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  organizerLabel: {
    fontSize: 12,
    color: '#666',
  },
  organizerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  contactText: {
    fontSize: 13,
    color: '#333',
  },
  mediaSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  mediaImageContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  mediaImage: {
    width: '100%',
    height: 200,
  },
  mediaPartnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mediaLogoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mediaTextContainer: {
    flex: 1,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00BCD4',
    marginBottom: 3,
  },
  mediaTitleGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00C853',
    marginBottom: 3,
  },
  mediaSubtitle: {
    fontSize: 11,
    color: '#999',
    letterSpacing: 0.5,
  },
  mediaImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  abstractButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  abstractButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sbiButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sbiButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pharmacyIndiaLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginHorizontal: 'auto',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  indiaFlagTop: {
    height: 30,
    backgroundColor: '#FF9933',
  },
  indiaFlagMiddle: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indiaFlagBottom: {
    height: 30,
    backgroundColor: '#138808',
  },
  pharmacyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  indiaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  paymentSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  paymentText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E31E24',
    marginBottom: 20,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#E31E24',
    marginLeft: 10,
    fontWeight: '600',
    lineHeight: 18,
  },
  qrSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 0,
    alignItems: 'center',
    marginBottom: 15,
  },
  qrImage: {
    width: '100%',
    height: 400,
  },
  qrLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tidText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  qrPlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  qrInstruction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  qrFooter: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
  },
  uploadNote: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  glanceSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  glanceImage: {
    width: '100%',
    height: 300,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  thrustSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  thrustHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thrustTopicsContainer: {
    overflow: 'hidden',
  },
  thrustTopicsList: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  thrustTopicItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
  },
  thrustBullet: {
    fontSize: 14,
    color: '#E31E24',
    marginRight: 10,
    marginTop: 2,
  },
  thrustTopicText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  patronSection: {
    marginBottom: 20,
  },
  patronHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  patronLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E31E24',
  },
  patronBadge: {
    backgroundColor: '#E31E24',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  patronText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  patronGrid: {
    marginBottom: 20,
  },
  patronCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  personInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  personName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  personRole: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  convenerSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  convenerLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 8,
    textAlign: 'center',
  },
  advisorText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  venueSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  venueHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  venueLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#333',
  },
  venueBadge: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  venueText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  venueName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  venueAddress: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  glimpsesSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  glimpsesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
    textAlign: 'center',
    marginBottom: 15,
  },
  carouselContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  carouselButtonLeft: {
    left: 10,
  },
  carouselButtonRight: {
    right: 10,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeDot: {
    backgroundColor: '#E31E24',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  eventCarouselSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  eventCarouselContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  eventCarouselImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 600,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -40,
    right: 0,
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  modalNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  modalNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDots: {
    flexDirection: 'row',
    gap: 10,
  },
  modalDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  modalActiveDot: {
    backgroundColor: '#E31E24',
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  programsDetailSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  programDetail: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  registerSection: {
    backgroundColor: '#00ACC1',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    width: '100%',
    alignItems: 'center',
  },
  registerNowImage: {
    width: '90%',
    height: 150,
  },
  bottomSpacing: {
    height: 20,
  },
});