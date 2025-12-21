import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header() {
  const handleSearch = () => {
    console.log('Search pressed');
    // Add search functionality here
  };

  return (
    <View style={styles.header}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <View style={styles.triangleTop} />
          <View style={styles.triangleBottom} />
        </View>
        <View style={styles.logoTextContainer}>
          <Text style={styles.logoTextMain}>BHUJBAL</Text>
          <Text style={styles.logoTextSub}>KNOWLEDGE CITY</Text>
          <View style={styles.trustBadge}>
            <Text style={styles.trustText}>Mumbai Educational Trust</Text>
          </View>
        </View>
      </View>

      

      {/* Search Icon */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <MaterialIcons name="search" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 35,
    height: 40,
    position: 'relative',
  },
  triangleTop: {
    width: 0,
    height: 0,
    borderLeftWidth: 17.5,
    borderRightWidth: 17.5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E31E24',
  },
  triangleBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 17.5,
    borderRightWidth: 17.5,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#E31E24',
    marginTop: -2,
  },
  logoTextContainer: {
    alignItems: 'flex-start',
  },
  logoTextMain: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E31E24',
    letterSpacing: 0.5,
  },
  logoTextSub: {
    fontSize: 9,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.3,
  },
  trustBadge: {
    backgroundColor: '#E31E24',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginTop: 1,
  },
  trustText: {
    fontSize: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  searchButton: {
    padding: 8,
  },
});
