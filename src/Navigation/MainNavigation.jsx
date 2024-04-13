import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import {
  Ionicons,
  Feather,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Register } from "../Screens/Register";

const Tabs = createBottomTabNavigator();
const { Navigator, Screen } = Tabs;

export const MainNavigation = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: "#F0F0F0", height: 60 },
        tabBarActiveTintColor: "#0E5A64",
      }}
    >
      <Screen
        options={{
          title: "Ahabanza",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                style={styles.icons}
                name="ios-home-sharp"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="Home"
        component={Home}
      />

      <Screen
        options={{
          title: "Amande",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="payments" size={size} color={color} />;
          },
        }}
        name="Fines"
        component={Register}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({});
