import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";

const Tabs = createBottomTabNavigator();
const { Navigator, Screen } = Tabs;

export const MainNavigation = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

const styles = StyleSheet.create({});
