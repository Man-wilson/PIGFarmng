import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

export const SmallButtons = ({ text, icon, action, loading }) => {
  let [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_500Medium });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={action}>
        {loading ? (
          <ActivityIndicator style={styles.btnText} size={30} color={"#fff"} />
        ) : (
          <Text style={styles.btnText}> {text} </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginTop: "30@s",
    backgroundColor: "#808080",
    width: "320@s",
    height: "40@s",
    borderRadius: "30@s",
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    alignSelf: "center",
    paddingVertical: "5@s",
    fontSize: "20@s",
    fontFamily: "Poppins_500Medium",
  },
});
