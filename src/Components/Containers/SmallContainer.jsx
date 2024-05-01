import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export const SmallContainer = ({ imageSource, title, number }) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: "16@s",
    backgroundColor: "#29b366",
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
    borderRadius: "25@s",
  },
  text: {
    flex: 1, // Takes remaining space
    // marginLeft: "10@s",
    fontSize: "16@s",
    textAlign: "center",
    fontFamily: "Poppins_800ExtraBold",
  },
  number: {
    fontSize: "20@s",
    fontWeight: "bold",
  },
});
