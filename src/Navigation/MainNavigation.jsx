import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Screens/Home";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Register } from "../Screens/Register";
import { FarmerHome } from "../Screens/FarmerHome";
import { Veterinary } from "../Screens/Veterinary";
import { ScaledSheet } from "react-native-size-matters";
import { Login } from "../Screens/Login";
import { CreateFarm } from "../Screens/CreateFarm";
import { Profile } from "../Screens/Profile";
import { Farm } from "../Screens/Farm";

const Tabs = createBottomTabNavigator();
const { Navigator, Screen } = Tabs;

export const MainNavigation = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#eeeee4",
          height: 60,
          borderRadius: 50,
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 20,
          paddingHorizontal: 20,
          paddingBottom: 10,
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarActiveTintColor: "#0E5A64",
        // tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarShowLabel: false,
      }}
    >
      <Screen
        options={{
          title: "Login",
          tabBarIcon: ({ color, size }) => {
            return (
              <Entypo
                style={styles.icon}
                name="home"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="FarmerHome"
        component={FarmerHome}
      />
      <Screen
        options={{
          title: "Farm-Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="pig" size={size} color={color} />
            );
          },
        }}
        name="Farm"
        component={Farm}
      />
      <Screen
        options={{
          title: "Farm-Home",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome6
                style={styles.icon}
                name="user-doctor"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="Vetz"
        component={Veterinary}
      />
      <Screen
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome
                style={styles.icon}
                name="user-circle"
                size={size}
                color={color}
              />
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Navigator>
  );
};

const styles = ScaledSheet.create({
  icon: {
    marginBottom: "-5@s",
  },
});
