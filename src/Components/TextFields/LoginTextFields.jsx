import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

export const LoginTextFields = ({
  Placeholder,
  icon,
  customHeight,
  Onchange,
  value,
  secureTextEntry,
  multiline,
}) => {
  return (
    <View style={[styles.Input, { height: customHeight }]}>
      <TextInput
        placeholder={Placeholder}
        onChange={Onchange}
        value={value}
        multiline={multiline}
        style={{ height: customHeight, width: 280 }}
        secureTextEntry={secureTextEntry}
        keyboardType={Placeholder === "Email" ? "email-address" : "default"}
      />
      {icon}
    </View>
  );
};

const styles = ScaledSheet.create({
  Input: {
    width: "320@s",
    // height: "48@s",
    borderRadius: "10@s",
    borderWidth: "1@s",
    textDecorationColor: "black",
    marginVertical: "5@s",
    // elevation:'5@s',
    padding: "10@vs",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
