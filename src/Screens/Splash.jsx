import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Onboarding1 } from "./Onboardind1";

export const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding1"); // Used replace instead of navigate
    }, 6000); // 3000 milliseconds equals 3 seconds
    return () => clearTimeout(timer);
  }, [navigation, Onboarding1]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/PIG FARMING2 (1).png")}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#28b266",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: "contain",
  },
});
