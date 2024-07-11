import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";

export const Onboarding3 = ({ route }) => {
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    await SecureStore.setItemAsync("onboardingComplete", "true");
    navigation.navigate("Login");
  };

  const screenIndex = 2; // Current screen index

  return (
    <>
      <StatusBar style="black" backgroundColor="#28b269" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/pngimg.png")}
          style={styles.image}
        />
        <View style={styles.iconsContainer}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.icon,
                screenIndex === index ? styles.activeIcon : styles.inactiveIcon,
              ]}
            />
          ))}
        </View>
        <Text style={styles.title}>
          Harness the power of data-driven insights to elevate your pig farming
          business.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    width: 200,
    height: 200,
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
    backgroundColor: "#0E5A64",
    opacity: 1,
  },
  inactiveIcon: {
    backgroundColor: "#0E5A64",
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
    paddingHorizontal: 10,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  button: {
    backgroundColor: "#0E5A64",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
