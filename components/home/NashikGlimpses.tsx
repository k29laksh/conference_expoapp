import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const carouselImages = [
  require('@/assets/images/carousel1.png'),
  require('@/assets/images/carousel2.png'),
  require('@/assets/images/carousel3.png'),
  require('@/assets/images/carousel4.png'),
  require('@/assets/images/carousel5.png'),
];

export default function NashikGlimpses() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentCarouselIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentCarouselIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={styles.glimpsesSection}>
      <Text style={styles.glimpsesTitle}>GLIMPSES OF NASHIK</Text>
      <View style={styles.divider} />
      
      <View style={styles.carouselContainer}>
        <Image 
          source={carouselImages[currentCarouselIndex]}
          style={styles.carouselImage}
          resizeMode="cover"
        />
        
        <TouchableOpacity 
          style={[styles.carouselButton, styles.carouselButtonLeft]}
          onPress={goToPrevSlide}
        >
          <MaterialIcons name="chevron-left" size={32} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.carouselButton, styles.carouselButtonRight]}
          onPress={goToNextSlide}
        >
          <MaterialIcons name="chevron-right" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.carouselDots}>
        {carouselImages.map((_, index) => (
          <View 
            key={index} 
            style={[styles.dot, index === currentCarouselIndex && styles.activeDot]} 
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  glimpsesSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  glimpsesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E31E24',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  carouselContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  carouselButtonLeft: {
    left: 10,
  },
  carouselButtonRight: {
    right: 10,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeDot: {
    backgroundColor: '#E31E24',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
