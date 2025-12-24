import { View, Text, Image, StyleSheet } from 'react-native';

const patronData = [
  {
    name: 'Hon. Shri Chhagan Bhujbal',
    role: 'Chairman, MET, Bhujbal Knowledge City',
    image: require('@/assets/images/chaggan.png'),
  },
  {
    name: 'Hon. Shri. Samir Bhujbal',
    role: 'Trustee, MET, Bhujbal Knowledge City',
    image: require('@/assets/images/samir.png'),
  },
  {
    name: 'Hon. Shri. Pankaj Bhujbal',
    role: 'Trustee, MET, Bhujbal Knowledge City',
    image: require('@/assets/images/pankaj.png'),
  },
  
  {
    name: 'Hon. Dr. Shefali Bhujbal',
    role: 'Member, MET, Bhujbal Knowledge City',
    image: require('@/assets/images/shefali.png'),
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
        {patronData.map((patron, index) => (
          <View key={index} style={styles.patronCard}>
            <Image 
              source={patron.image}
              style={styles.personImage}
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
});
