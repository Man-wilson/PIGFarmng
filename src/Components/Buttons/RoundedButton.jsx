import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

export const RoundedButton = ({ text, icon, action, disabled, loading }) => {
  let [fontsLoaded] = useFonts({ Poppins_700Bold });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={disabled} onPress={action}>
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
    backgroundColor: "#1bae68",
    width: "230@s",
    height: "48@s",
    borderRadius: "30@s",
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    alignSelf: "center",
    paddingVertical: "10@s",
    fontSize: "20@s",
    fontFamily: "Poppins_700Bold",
  },
});
