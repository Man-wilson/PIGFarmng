import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { StatusBar } from "expo-status-bar";

export const Onboarding2 = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_600SemiBold,
  });
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Onboarding3");
    }, 3000); // Navigate after 5 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }
  const screenIndex = 1; // Current screen index

  return (
    <>
      <StatusBar style="black" backgroundColor="#28b269" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/Piglet-PNG.png")}
          style={styles.image}
        />
        <View style={styles.iconsContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.icon,
                screenIndex === index && isFocused
                  ? styles.activeIcon
                  : styles.inactiveIcon,
              ]}
            />
          ))}
        </View>
        <Text style={styles.title}>
          Optimize your herd's health and productivity with our comprehensive
          pig farming platform.
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28b269",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeIcon: {
    backgroundColor: "#0E5A64", // Active screen color
    opacity: 1, // Full opacity for active screen
  },
  inactiveIcon: {
    backgroundColor: "#0E5A64", // Inactive screen color
    opacity: 0.5, // Reduced opacity for inactive screens
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    paddingHorizontal: 10,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Poppins_600SemiBold",
  },
});
