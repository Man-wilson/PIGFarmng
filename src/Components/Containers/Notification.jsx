import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export const Notification = ({
  imageSource,
  title,
  description,
  number,
  isRead,
  userId,
  pigId,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          isRead ? styles.readStyle : styles.unreadStyle,
        ]}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.isRead}>{isRead ? "Read" : "Unread"}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.callButton}
        >
          <Text style={styles.callText}>Reply</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reply</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
            />
            <Text>User ID: {userId}</Text>
            <Text>Pig ID: {pigId}</Text>
            <Button title="Send" />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: "16@s",
    borderRadius: "10@s",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: "4@s",
    shadowOpacity: 0.1,
    marginVertical: "5@s",
    alignItems: "center",
  },
  image: {
    width: "50@s",
    height: "50@s",
    borderRadius: "25@s",
    marginRight: "10@s",
  },
  textContainer: {
    flex: 1,
    paddingLeft: "10@s",
  },
  title: {
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#f0f0f0",
  },
  description: {
    fontSize: "14@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#000000",
  },
  number: {
    fontSize: "12@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#ffffff",
  },
  icon: {},
  readStyle: {
    backgroundColor: "#28b266", // Light grey for read notifications
  },
  unreadStyle: {
    backgroundColor: "#87979f", // White for unread notifications
  },
  callButton: {
    backgroundColor: "#d88451",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
  input: {
    width: "80%",
    padding: "10@s",
    borderRadius: "5@s",
    borderWidth: "1@s",
    borderColor: "#ccc",
    marginBottom: "10@s",
  },
  closeButton: {
    marginTop: "10@s",
  },
  closeText: {
    color: "#d88451",
    fontWeight: "bold",
  },
});
