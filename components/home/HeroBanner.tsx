import { View, Text, StyleSheet } from 'react-native';

export default function HeroBanner() {
  return (
    <>
      <View style={styles.heroBanner}>
        <Text style={styles.heroTitle}>
          2<Text style={styles.superscript}>nd</Text>MET-I-CON <Text style={styles.heroYear}>2026</Text>
        </Text>
        <Text style={styles.heroDate}>9th & 10th Jan 2026</Text>
      </View>

      <View style={styles.themeSection}>
        <Text style={styles.themeLabel}>International Conference on</Text>
        <Text style={styles.themeTitle}>Future Trends and Opportunities</Text>
        <Text style={styles.themeTitle}>in Pharmaceutical World</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
