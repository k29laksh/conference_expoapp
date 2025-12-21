import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '@/components/Footer';

export default function RegistrationScreen() {
  const handleRegisterClick = () => {
    // Open registration link
    Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSel1sMkCNZ50AU7DXslL-fi6xFOQO3kLB6xBAXaGKS0Gu3Tnw/viewform');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Register Now Banner */}
      <View style={styles.registerBanner}>
        <Image 
          source={require('@/assets/images/registernow.png')}
          style={styles.registerNowImage}
          resizeMode="contain"
        />
      </View>

      {/* Click to Register Button */}
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterClick}>
          <Text style={styles.registerButtonText}>Click here to Register</Text>
        </TouchableOpacity>
        
        {/* Social Media Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialIcons name="smart-display" size={28} color="#FF0000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialIcons name="facebook" size={28} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialIcons name="camera-alt" size={28} color="#E4405F" />
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
              Registration fee covers day time hospitality during conference days*, proceedings and kit for the registered delegates.
            </Text>
          </View>
          <View style={styles.detailPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.detailText}>
              Registration fee is non-refundable and nontransferable. However, change in nomination can be permitted only on request.
            </Text>
          </View>
          <View style={styles.detailPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.detailText}>
              Register online for regular updates of the conference; however, registration will be confirmed on receipt of registration fees.
            </Text>
          </View>
        </View>
      </View>

      {/* Conference Details */}
      <View style={styles.conferenceSection}>
        <Text style={styles.conferenceTitle}>REGISTRATION FEES FOR PAPER PRESENTERS & DELEGATES</Text>
        
        <View style={styles.conferenceHeader}>
          <Text style={styles.conferenceMainTitle}>2nd MET-I-CON 2026</Text>
          <Text style={styles.conferenceDateSmall}>9th & 10th Jan 2026</Text>
          <Text style={styles.conferenceSubtitle}>International Conference on</Text>
          <Text style={styles.conferenceTheme}>Future Trends and Opportunities in Pharmaceutical World</Text>
          <View style={styles.callForPaperBadge}>
            <Text style={styles.callForPaperText}>CALL FOR PAPER</Text>
          </View>
        </View>

        <Text style={styles.abstractInfo}>
          The research abstracts in the mentioned oral areas are invited. The paper must be an original contribution that has not been 
          published previously or not under consideration for publication or presentation elsewhere. Abstract can be submitted online 
          through email on meticon@bkc.met.edu on or before December 31st, 2025 and the format available on website. The poster will be 
          presented by presenting author through email by January 5th, 2026. All accepted posters will be presented at Poster presentation session 
          during the conference. Presenting authors have to register themselves for the conference on receipt of acceptance mail. A 
          maximum of 3 persons, one main author and two Co-authors can participate in a paper presentation. Undergraduate students, Post 
          Graduate students, M. Pharma students, Faculties, Academicians, Researchers, Pharmaceutical industrial personnel, Clinical practioners, 
          Ph.D. Scholars, PG Students.
        </Text>

        {/* Important Dates Table */}
        <View style={styles.importantDatesSection}>
          <Text style={styles.tableTitle}>IMPORTANT DATES</Text>
          <View style={styles.datesTable}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Abstract Submission</Text>
              <Text style={styles.tableCellValue}>December 31st, 2025</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Intimation of Acceptance</Text>
              <Text style={styles.tableCellValue}>January 2nd, 2026</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Final Registration for Paper Presenter</Text>
              <Text style={styles.tableCellValue}>January 5th, 2026</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Early Bird Registration</Text>
              <Text style={styles.tableCellValue}>November 5th, 2025</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Delegate Registration</Text>
              <Text style={styles.tableCellValue}>Till January 4th, 2026</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>On the spot Registration</Text>
              <Text style={styles.tableCellValue}>January 5th, 2026 onwards</Text>
            </View>
            <View style={styles.tableRowNote}>
              <Text style={styles.tableCellNote}>(Subject to Availability of Registration)</Text>
            </View>
          </View>
        </View>

        {/* Registration Details Table */}
        <View style={styles.feesTableSection}>
          <Text style={styles.tableTitle}>REGISTRATION DETAILS</Text>
          <View style={styles.feesTable}>
            <View style={styles.feesTableHeader}>
              <Text style={styles.feesHeaderCell}>Category</Text>
              <Text style={styles.feesHeaderCell}>Early{'\n'}Bird{'\n'}Registration</Text>
              <Text style={styles.feesHeaderCell}>Paper Presenter &{'\n'}Only Delegates: Up to{'\n'}January 5th, 2026</Text>
              <Text style={styles.feesHeaderCell}>Spot Registration From{'\n'}January 5th, 2026</Text>
            </View>
            <View style={styles.feesTableRow}>
              <Text style={styles.feesCell}>PG & Ph.D. Student</Text>
              <Text style={styles.feesCell}>2500</Text>
              <Text style={styles.feesCell}>3000</Text>
              <Text style={styles.feesCell}>3000</Text>
            </View>
            <View style={styles.feesTableRow}>
              <Text style={styles.feesCell}>Academicians</Text>
              <Text style={styles.feesCell}>2800</Text>
              <Text style={styles.feesCell}>3000</Text>
              <Text style={styles.feesCell}>3500</Text>
            </View>
            <View style={styles.feesTableRow}>
              <Text style={styles.feesCell}>Industry</Text>
              <Text style={styles.feesCell}>2800</Text>
              <Text style={styles.feesCell}>3000</Text>
              <Text style={styles.feesCell}>3500</Text>
            </View>
            <View style={styles.feesTableRow}>
              <Text style={styles.feesCell}>International Delegates</Text>
              <Text style={styles.feesCell}>USD 50</Text>
              <Text style={styles.feesCell}>USD 60</Text>
              <Text style={styles.feesCell}>USD 75</Text>
            </View>
          </View>
        </View>

        <View style={styles.feesNotes}>
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.noteText}>
              Registration fee covers day time hospitality during conference days*, proceedings and kit for the registered delegates.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.noteText}>
              Registration fee is non-refundable and nontransferable. However, change in nomination can be permitted only on request.
            </Text>
          </View>
          <View style={styles.noteItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.noteText}>
              Register online for regular updates of the conference; however, registration will be confirmed on receipt of registration fees.
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Process */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>PAYMENT PROCESS:</Text>
        
        <View style={styles.paymentContainer}>
          <View style={styles.paymentInstructions}>
            <View style={styles.paymentPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.paymentText}>
                For an auto-generated payment receipt, please proceed through the SBI Collect payment gateway.
              </Text>
            </View>
            <View style={styles.paymentPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.paymentText}>
                For payments via HDFC QR code, kindly upload the UPI payment screenshot/receipt along with the transaction ID in the section below.
              </Text>
            </View>
          </View>

          <View style={styles.qrSection}>
            <Image 
              source={require('@/assets/images/qrcode2.png')}
              style={styles.qrCodeImage}
              resizeMode="contain"
            />

            <View style={styles.sbiCollectSection}>
              <Image 
                source={require('@/assets/images/sbicollect.png')}
                style={styles.sbiCollectImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <Text style={styles.uploadWarning}>
          STRICTLY upload UPI payment receipt/screenshot or auto-generated receipt in case of SBI collect, along with the transaction ID 
          below. Failure to do so will invalidate your registration.
        </Text>
      </View>

      {/* Contact Us */}
      <View style={styles.contactSection}>
        <View style={styles.contactHeader}>
          <Image 
            source={require('@/assets/images/phone.png')}
            style={styles.phoneIcon}
            resizeMode="contain"
          />
          <Text style={styles.contactTitle}>CONTACT US</Text>
          <View style={styles.contactInfo}>
            
            <Text style={styles.contactAddress}>
              MET&apos;s Institute of Pharmacy, Bhujbal Knowledge City, Adgaon, Nashik, Maharashtra, India-03
            </Text>
            
            <Text style={styles.contactLabel}>Convener: Dr. Sanjay J. Kshirsagar,</Text>
            <Text style={styles.contactLabel}>Organizing Secretary:</Text>
            
            <View style={styles.contactPerson}>
              <Text style={styles.bullet}>■</Text>
              <Text style={styles.contactName}>Dr. Santosh S. Chhajed | </Text>
              <TouchableOpacity onPress={() => Linking.openURL('mailto:Santoshc_iop@bkc.met.edu')}>
                <Text style={styles.contactEmail}>Santoshc_iop@bkc.met.edu</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.contactPerson}>
              <Text style={styles.bullet}>■</Text>
              <Text style={styles.contactName}>Dr. Sachin S. Gaikwad | </Text>
              <TouchableOpacity onPress={() => Linking.openURL('mailto:Saching_iop@bkc.met.edu')}>
                <Text style={styles.contactEmail}>Saching_iop@bkc.met.edu</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.contactPerson}>
              <Text style={styles.bullet}>■</Text>
              <Text style={styles.contactName}>Dr. Deepak S. Bhambere | </Text>
              <TouchableOpacity onPress={() => Linking.openURL('mailto:Deepaks_iop@bkc.met.edu')}>
                <Text style={styles.contactEmail}>Deepaks_iop@bkc.met.edu</Text>
              </TouchableOpacity>
            </View>

            {/* Social Media Icons */}
            <View style={styles.contactSocialIcons}>
              <TouchableOpacity style={styles.contactSocialIcon}>
                <MaterialIcons name="smart-display" size={32} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactSocialIcon}>
                <MaterialIcons name="facebook" size={32} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactSocialIcon}>
                <MaterialIcons name="camera-alt" size={32} color="#E4405F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  registerBanner: {
    width: '100%',
    height: 200,
    backgroundColor: '#00ACC1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerNowImage: {
    width: '90%',
    height: '100%',
  },
  registerButtonContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  detailSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailDivider: {
    width: 100,
    height: 3,
    backgroundColor: '#2C3E50',
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailPoints: {
    marginTop: 10,
  },
  detailPoint: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingRight: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#2C3E50',
    marginRight: 8,
    fontWeight: 'bold',
    marginTop: 2,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  conferenceSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  conferenceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  conferenceHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  conferenceMainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  conferenceDateSmall: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },
  conferenceSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  conferenceTheme: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginVertical: 5,
  },
  callForPaperBadge: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 10,
  },
  callForPaperText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  abstractInfo: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'justify',
  },
  importantDatesSection: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 15,
  },
  datesTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#555',
  },
  tableCellValue: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
  },
  tableRowNote: {
    padding: 8,
    backgroundColor: '#f8f9fa',
  },
  tableCellNote: {
    fontSize: 11,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  feesTableSection: {
    marginTop: 30,
  },
  feesTable: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  feesTableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    padding: 10,
  },
  feesHeaderCell: {
    flex: 1,
    fontSize: 11,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feesTableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  feesCell: {
    flex: 1,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  feesNotes: {
    marginTop: 20,
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
  paymentSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  paymentContainer: {
    marginTop: 10,
  },
  paymentInstructions: {
    marginBottom: 20,
  },
  paymentPoint: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
  },
  paymentText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
  qrSection: {
    flexDirection: 'column',
    gap: 15,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  qrCodeImage: {
    width: '100%',
    height: 400,
  },
  sbiCollectSection: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sbiCollectImage: {
    width: '100%',
    height: 150,
  },
  uploadWarning: {
    fontSize: 13,
    color: '#E31E24',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  contactHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  phoneIcon: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  contactInfo: {
    width: '100%',
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactAddress: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
    lineHeight: 19,
  },
  contactLabel: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },
  contactPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  contactName: {
    fontSize: 13,
    color: '#555',
  },
  contactEmail: {
    fontSize: 13,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  contactSocialIcons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
    justifyContent: 'center',
  },
  contactSocialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
