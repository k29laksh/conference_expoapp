import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function MediaPartners() {
  return (
    <View style={styles.mediaSection}>
      <Text style={styles.sectionTitle}>MEDIA PARTNERS</Text>
      
      <TouchableOpacity 
        style={styles.mediaImageContainer}
        onPress={() => Linking.openURL('https://allconferencealert.net/')}
      >
        <Image 
          source={require('@/assets/images/allconferences.png')}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.mediaImageContainer}>
        <Image 
          source={require('@/assets/images/infopedia.png')}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.mediaImageContainer}>
        <Image 
          source={require('@/assets/images/books.png')}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity 
        style={styles.abstractButton}
        onPress={() => Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLScF_b4LPvYme8HqZiBgfxoOrzCKdFl1Uht-q35wbRcGCkL33A/viewform')}
      >
        <Text style={styles.abstractButtonText}>Submit Abstract</Text>
      </TouchableOpacity>

      <View style={styles.mediaImageContainer}>
        <Image 
          source={require('@/assets/images/pharmacy.png')}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.mediaImageContainer}>
        <Image 
          source={require('@/assets/images/sbicollect.png')}
          style={styles.mediaImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity 
        style={styles.sbiButton}
        onPress={() => Linking.openURL('https://onlinesbi.sbi.bank.in/sbicollect/icollecthome.htm')}
      >
        <Text style={styles.sbiButtonText}>SBI COLLECT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mediaSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
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
});
