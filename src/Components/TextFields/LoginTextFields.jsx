import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import RNPickerSelect from "react-native-picker-select";

export const LoginTextFields = ({
  Placeholder,
  icon,
  customHeight,
  OnChangeText,
  value,
  secureTextEntry,
  multiline,
  isDropdown,
  dropdownOptions,
  onValueChange,
}) => {
  return (
    <View style={[styles.Input, { height: customHeight }]}>
      {isDropdown ? (
        <RNPickerSelect
          onValueChange={onValueChange}
          items={dropdownOptions}
          placeholder={{ label: Placeholder, value: null }}
          style={{ ...pickerSelectStyles }}
          useNativeAndroidPickerStyle={false}
        />
      ) : (
        <TextInput
          placeholder={Placeholder}
          onChangeText={OnChangeText}
          style={{ height: customHeight, flex: 1 }}
          secureTextEntry={secureTextEntry}
          value={value}
          multiline={multiline}
        />
      )}
      <TouchableOpacity>{icon}</TouchableOpacity>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
