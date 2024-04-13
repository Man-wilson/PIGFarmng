import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../Screens/Login";
import { Register } from "../Screens/Register";
import { MainNavigation } from "./MainNavigation";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export const AppNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="HOMEE" component={MainNavigation} />
    </Navigator>
  );
};

const styles = StyleSheet.create({});
