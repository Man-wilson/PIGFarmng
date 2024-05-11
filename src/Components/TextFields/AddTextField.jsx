import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddTextField = ({ placeholder, value, onChangeText }) => {
  return (
    <View style={{}}>
      <TextInput
        style={styles.Textfiled}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  Textfiled: {
    width: "230@s",
    height: "40@s",
    borderRadius: "10@s",
    borderWidth: "0.5@s",
    borderColor: "black",
    paddingHorizontal: "10@s",
  },
});
