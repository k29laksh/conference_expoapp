import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PaymentSection() {
  return (
    <View style={styles.paymentSection}>
      <Text style={styles.paymentTitle}>Payment Information</Text>
      <Text style={styles.paymentText}>
        For an auto-generated payment receipt, please proceed through the SBI Collect payment gateway.
      </Text>
      <View style={styles.warningBox}>
        <MaterialIcons name="warning" size={20} color="#E31E24" />
        <Text style={styles.warningText}>
          STRICTLY upload UPI payment receipt/screenshot or auto-generated receipt in case of SBI collect along with the transaction ID below. Failure to do so will invalidate your registration.
        </Text>
      </View>
      
      <View style={styles.qrSection}>
        <Image 
          source={require('@/assets/images/paymentqrcode1.png')}
          style={styles.qrImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.uploadNote}>
        For payments via HDFC QR code, kindly upload the UPI payment screenshot/receipt along with the transaction ID in while registration process.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'column',
    gap: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  qrImage: {
    width: '100%',
    height: 400,
  },
  uploadNote: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
