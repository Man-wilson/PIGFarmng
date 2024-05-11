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
import { useSelector } from "react-redux";
import { Onboarding1 } from "../Screens/Onboardind1";
import { Notifications } from "../Screens/Veterinary/Notifications";
import { HealthRecords } from "../Screens/Veterinary/HealthRecords";
import { VetProfile } from "../Screens/Veterinary/VetProfile";
import { CreateHealthRecords } from "../Screens/Veterinary/CreateHealthRecords";
import { GovHome } from "../Screens/Govement/GovHome";
import { GovProfile } from "../Screens/Govement/GovProfile";

const Tabs = createBottomTabNavigator();
const { Navigator, Screen } = Tabs;

export const MainNavigation = () => {
  const userData = useSelector((state) => state.authentication.userData);
  // console.log(userData, "user dataaaaaaaaaaaaaaaaaa");
  const { roleId } = userData;
  // console.log(roleId, "user roleeeeee");

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
        component={
          roleId === 2
            ? FarmerHome
            : roleId === 3
            ? Home
            : roleId === 4
            ? GovHome
            : Onboarding1
        }
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
        component={
          roleId === 2 ? Farm : roleId === 3 ? CreateHealthRecords : Onboarding1
        }
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
        component={
          roleId === 2 ? Veterinary : roleId === 3 ? HealthRecords : Onboarding1
        }
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
        component={
          roleId === 2
            ? Profile
            : roleId === 3
            ? VetProfile
            : roleId === 4
            ? GovProfile
            : Onboarding1
        }
      />
    </Navigator>
  );
};

const styles = ScaledSheet.create({
  icon: {
    marginBottom: "-5@s",
  },
});
