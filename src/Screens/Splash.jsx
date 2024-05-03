import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Onboarding1 } from "./Onboardind1";

export const Splash = ({ onComplete }) => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigation.navigate("Onboarding1");
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

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
