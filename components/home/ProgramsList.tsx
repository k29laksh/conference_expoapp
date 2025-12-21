import { View, Text, StyleSheet } from 'react-native';

export default function ProgramsList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programs Offered:</Text>
      <Text style={styles.text}>
        D. Pharmacy | B. Pharmacy | M. Pharmacy (Pharmaceutics, Quality Assurance...) | Ph.D. in Pharmacy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f9f9f9', marginTop: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  text: { fontSize: 16, textAlign: 'center', lineHeight: 24 }
});