import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

const speakers = [
  {
    name: 'Dr. Zyta Ziora',
    title: 'Lecturer in Biotechnology Program',
    organization: 'The University of Queensland',
    country: 'Australia',
    imageUri: require('@/assets/images/zyta.png'),
  },
  {
    name: 'Dr. Abdi Wira Septama',
    title: 'Research Scientist',
    organization: 'National Research and Innovation Agency (BRIN)',
    country: 'Indonesia',
    imageUri: require('@/assets/images/abdi.png'),
  },
  {
    name: 'Dr. Kim Seok-ho',
    title: 'Professor, College of Pharmacy',
    organization: 'Kangwon National University',
    country: 'South Korea',
    imageUri: require('@/assets/images/kim.png'),
  },
  {
    name: 'Dr. Kailas Kalicharan Moravkar',
    title: 'Principal, Research Engineer',
    organization: 'Regeron Inc.',
    country: 'South Korea',
    imageUri: require('@/assets/images/kailash.png'),
  },
  {
    name: 'Dr. Nilesh Prakash Nirmal',
    title: 'Global Talent Scientist, Institute of Nutrition',
    organization: 'Mahidol University Salaya',
    country: 'Bangkok, Thailand',
    imageUri: require('@/assets/images/nilesh.png'),
  },
  {
    name: 'Prof. Dr. Javed Ali',
    title: 'Dept of Pharmaceutics',
    organization: 'Jamia Hamdard University',
    country: 'New Delhi',
    imageUri: require('@/assets/images/javed.png'),
  },
  {
    name: 'Prof. Rakesh K. Tekade',
    title: 'Associate Dean (R&D), Professor and Head',
    organization: 'Department of Pharmaceutics, NIPER-Ahmedabad',
    country: 'India',
    imageUri: require('@/assets/images/rakesh.png'),
  },
  {
    name: 'Mr. Sharad Chandak',
    title: 'Packaging Head',
    organization: 'Glenmark Pharmaceuticals, Sinner',
    country: 'India',
    imageUri: require('@/assets/images/sharad.png'),
  },
  {
    name: 'Dr. J. S. Wagh',
    title: 'Service Director (1999-2024)',
    organization: 'Walters India Pvt. Ltd., Mumbai',
    country: 'India',
    imageUri: require('@/assets/images/jswagh.png'),
  },
  {
    name: 'Dr. Manoj Chitnis',
    title: 'Vice President',
    organization: 'J B Chemicals & Pharmaceutical Ltd.',
    country: 'Mumbai',
    imageUri: require('@/assets/images/manoj.png'),
  },
  {
    name: 'Dr. Sachin Kushare',
    title: 'Research Scientist',
    organization: 'Glenmark Pharmaceuticals, Sinner',
    country: 'India',
    imageUri: require('@/assets/images/sachin.png'),
  },
];

export default function SpeakersScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>Speakers</Text>
        <View style={styles.divider} />
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introText}>
          MET-I-CON 2026 is honored to host distinguished speakers from across the globe. 
          Our expert panel comprises renowned researchers, academicians, and industry leaders 
          who are shaping the future of pharmaceutical sciences and technology.
        </Text>
      </View>

      

      {/* Speakers List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Speakers</Text>
        {speakers.map((speaker, index) => (
          <View key={index} style={styles.speakerCard}>
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
            <View style={styles.speakerInfo}>
              <Text style={styles.speakerName}>{speaker.name}</Text>
              <Text style={styles.speakerTitle}>{speaker.title}</Text>
              <Text style={styles.speakerOrg}>{speaker.organization}</Text>
              <View style={styles.countryBadge}>
                <MaterialIcons name="place" size={14} color="#E31E24" />
                <Text style={styles.countryText}>{speaker.country}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Speaker Footer Image */}
      <View style={styles.speakerFooterSection}>
        <Image 
          source={require('@/assets/images/speakerfooterimage.png')}
          style={styles.speakerFooterImage}
          resizeMode="contain"
        />
      </View>

    

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <MaterialIcons name="event" size={48} color="#E31E24" />
        <Text style={styles.ctaTitle}>Join Us at MET-I-CON 2026</Text>
        <Text style={styles.ctaText}>
          Don&apos;t miss this opportunity to learn from the best minds in pharmaceutical sciences. 
          Register now to secure your spot!
        </Text>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#2C3E50',
    padding: 30,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  divider: {
    width: 100,
    height: 4,
    backgroundColor: '#E31E24',
    marginTop: 15,
    borderRadius: 2,
  },
  introSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  introText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
  },
  excellenceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E31E24',
    gap: 10,
  },
  excellenceText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#E31E24',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  speakerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  speakerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  speakerImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  speakerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  speakerFooterSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  speakerFooterImage: {
    width: '100%',
    height: 200,
  },
  speakerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E31E24',
    marginBottom: 4,
  },
  speakerTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  speakerOrg: {
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
  },
  countryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  countryText: {
    fontSize: 12,
    color: '#E31E24',
    fontWeight: '600',
  },
  whyAttendSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingRight: 10,
  },
  benefitTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  affiliationsSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  affiliationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  affiliationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  affiliationText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  topicsSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  topicsList: {
    marginTop: 15,
  },
  topicItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingLeft: 10,
  },
  topicBullet: {
    fontSize: 20,
    color: '#E31E24',
    marginRight: 10,
    fontWeight: 'bold',
  },
  topicText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  ctaSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f8f9fa',
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E31E24',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 30,
  },
});
