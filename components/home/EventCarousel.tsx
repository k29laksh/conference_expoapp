import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

const eventImages = [
  require("@/assets/images/event1.png"),
  require("@/assets/images/event2.png"),
  require("@/assets/images/event3.png"),
];

export default function EventCarousel() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isCarouselModalVisible, setIsCarouselModalVisible] = useState(false);

  useEffect(() => {
    // Only auto-slide when modal is not visible
    if (!isCarouselModalVisible) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) =>
          prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isCarouselModalVisible]);

  const goToNextEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevEvent = () => {
    setCurrentEventIndex((prevIndex) =>
      prevIndex === 0 ? eventImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <View style={styles.eventCarouselSection}>
        <TouchableOpacity
          style={styles.eventCarouselContainer}
          onPress={() => setIsCarouselModalVisible(true)}
          activeOpacity={0.9}
        >
          <Image
            source={eventImages[currentEventIndex]}
            style={styles.eventCarouselImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={[styles.carouselButton, styles.carouselButtonLeft]}
            onPress={(e) => {
              e.stopPropagation();
              goToPrevEvent();
            }}
          >
            <MaterialIcons name="chevron-left" size={32} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.carouselButton, styles.carouselButtonRight]}
            onPress={(e) => {
              e.stopPropagation();
              goToNextEvent();
            }}
          >
            <MaterialIcons name="chevron-right" size={32} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.carouselDots}>
          {eventImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentEventIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <Modal
        visible={isCarouselModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsCarouselModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsCarouselModalVisible(false)}
            >
              <MaterialIcons name="close" size={30} color="#fff" />
            </TouchableOpacity>

            <Image
              source={eventImages[currentEventIndex]}
              style={styles.modalImage}
              resizeMode="contain"
            />

            <View style={styles.modalNavigation}>
              <TouchableOpacity
                style={styles.modalNavButton}
                onPress={goToPrevEvent}
              >
                <MaterialIcons name="chevron-left" size={40} color="#fff" />
              </TouchableOpacity>

              <View style={styles.modalDots}>
                {eventImages.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.modalDot,
                      index === currentEventIndex && styles.modalActiveDot,
                    ]}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalNavButton}
                onPress={goToNextEvent}
              >
                <MaterialIcons name="chevron-right" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  eventCarouselSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  eventCarouselContainer: {
    width: "100%",
    height: 550,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  eventCarouselImage: {
    width: "100%",
    height: "100%",
  },
  carouselButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  carouselButtonLeft: {
    left: 10,
  },
  carouselButtonRight: {
    right: 10,
  },
  carouselDots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  activeDot: {
    backgroundColor: "#E31E24",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxWidth: 600,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 0,
    zIndex: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 600,
    borderRadius: 8,
  },
  modalNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  modalNavButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalDots: {
    flexDirection: "row",
    gap: 10,
  },
  modalDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  modalActiveDot: {
    backgroundColor: "#E31E24",
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
