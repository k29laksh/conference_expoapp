import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

export default function CallForPaperScreen() {
  const handleSubmitAbstract = () => {
    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScF_b4LPvYme8HqZiBgfxoOrzCKdFl1Uht-q35wbRcGCkL33A/viewform');
  };

  const handleDownloadReference = () => {
    Linking.openURL('https://docs.google.com/document/d/1DeMxiG8nQSAboQRyLUP0trAVM_LCm7FtRCRopskE6eo/edit?tab=t.0#heading=h.56hvy77yvf58');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
    <ScrollView style={styles.container}>
      {/* Social Media Icons */}
      <View style={styles.socialSection}>
        <View style={styles.socialIcons}>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://www.youtube.com/@metiopnashik1321')}
          >
            <MaterialIcons name="smart-display" size={32} color="#FF0000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://www.facebook.com/people/METs-Institute-of-Pharmacy-Bhujbal-Knowledge-City-Adgaon-Nashik/100063790905651/')}
          >
            <MaterialIcons name="facebook" size={32} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => Linking.openURL('https://www.instagram.com/p/DLgzdSmIIBH/?utm_source=ig_web_copy_link')}
          >
            <MaterialCommunityIcons name="instagram" size={32} color="#E4405F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Click Here to Submit Abstract Button */}
      <View style={styles.submitSection}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAbstract}>
          <Text style={styles.submitButtonText}>Click Here to Submit Abstract</Text>
        </TouchableOpacity>
      </View>

      {/* Reference Abstract Body Structure Button */}
      <View style={styles.referenceSection}>
        <TouchableOpacity style={styles.referenceButton} onPress={handleDownloadReference}>
          <Text style={styles.referenceButtonText}>Reference Abstract Body Structure</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsSection}>
        <Text style={styles.instructionText}>
          Click on the above button to open the format in Google Docs.
        </Text>
        <Text style={styles.instructionText}>
          📄 Go to File → Download → Microsoft Word (.docx).
        </Text>
        <Text style={styles.instructionText}>
          ✏️ Edit the file and upload and abstract submission portal (exactly above &quot;Reference Abstract Body structure&quot; button.
        </Text>
      </View>

      {/* Call for Paper Image */}
      <View style={styles.callForPaperImageSection}>
        <Image 
          source={require('@/assets/images/callforpaper.png')}
          style={styles.callForPaperImage}
          resizeMode="contain"
        />
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
  socialSection: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  submitSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#2C3E50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  referenceSection: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  referenceButton: {
    backgroundColor: '#2C3E50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  referenceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  instructionsSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  callForPaperImageSection: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  callForPaperImage: {
    width: '100%',
    height: 250,
  },
});
