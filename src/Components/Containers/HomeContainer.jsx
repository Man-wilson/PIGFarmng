import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";

export const HomeContainer = ({ imageSource, title, description, number }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const [modalVisible, setModalVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.number}>{number}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            <Text style={styles.modalNumber}>{number}</Text>
            {/* Add more details here as needed */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    padding: "16@s",
    backgroundColor: "#303631",
    borderRadius: "10@s",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowRadius: "4@s", // Shadow blur radius for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    marginVertical: "5@s",
  },
  image: {
    width: "50@s",
    height: "50@s",
    borderRadius: "50@s",
  },
  text: {
    fontSize: "16@s",
    textAlign: "center",
    fontFamily: "Poppins_800ExtraBold",
    paddingVertical: "5@s",
    color: "#28b265",
  },
  description: {
    fontSize: "12@s",
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    color: "#ffffff",
    textAlign: "center",
  },
  number: {
    fontSize: "10@s",
    fontWeight: "bold",
    color: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: "10@s",
    padding: "20@s",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: "20@s",
    fontWeight: "bold",
    marginBottom: "10@s",
  },
  modalDescription: {
    fontSize: "16@s",
    marginBottom: "10@s",
  },
  modalNumber: {
    fontSize: "14@s",
    marginBottom: "20@s",
  },
  closeButton: {
    fontSize: "16@s",
    color: "#28b265",
    fontWeight: "bold",
  },
});
