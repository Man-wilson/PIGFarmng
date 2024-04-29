import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";

export const Notification = ({ imageSource, title, description, number }) => {
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
      <View></View>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.number}>{number}</Text>
      </View>
      <MaterialIcons name="star" size={24} color="orange" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: "16@s",
    backgroundColor: "#dbdcde",
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
  text: {
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#28b265",
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
});
