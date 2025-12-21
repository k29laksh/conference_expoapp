import { View, StyleSheet, Image, Text } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Image 
        source={require('@/assets/images/footerimage.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          @Copyright 2013. MET Bhujbal Knowledge City, All rights reserved
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    marginTop: 30,
  },
  footerImage: {
    width: '100%',
    height: 120,
  },
  copyrightContainer: {
    backgroundColor: '#2C3E50',
    paddingVertical: 15,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});
