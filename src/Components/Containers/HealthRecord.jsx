import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

export const HealthRecord = ({ record }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity>
      <View style={styles.recordContainer}>
        <Image
          source={require("../../../assets/doctor.png")}
          style={styles.image}
        />
        <View style={styles.recordContent}>
          <Text style={styles.nameText}>{record.name}</Text>
          <Text style={styles.descriptionText}>{record.description}</Text>
          <Text style={styles.treatmentText}>{record.treatment}</Text>
          <Text style={styles.pigIdText}>Pig ID: {record.pigId}</Text>
          <Text style={styles.dateText}>{record.date}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="information-circle-outline" size={34} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  recordContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "10@s",
    backgroundColor: "#fff",
    marginBottom: "10@s",
    borderRadius: "6@s",
    shadowColor: "#000",
    shadowOffset: { width: "0@s", height: "2@s" },
    shadowOpacity: "0.1@s",
    shadowRadius: "4@s",
    elevation: "3@s",
  },
  image: {
    width: "50@s",
    height: "50@s",
    borderRadius: "25@s",
    marginRight: "10@s",
  },
  recordContent: {
    flex: "1@s",
    paddingLeft: "10@s",
  },
  nameText: {
    fontSize: "14@s",
    color: "#000000",
    fontFamily: "Poppins_800ExtraBold",
  },
  dateText: {
    fontSize: "16@s",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: "14@s",
    color: "#333",
  },
  treatmentText: {
    fontSize: "14@s",
    color: "#333",
  },
  pigIdText: {
    fontSize: "12@s",
    color: "#555",
  },
});
