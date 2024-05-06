import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet } from "react-native-size-matters";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Farms } from "./Farms";
import { TotalPigs } from "./TotalPigs";
import { Farmers } from "./Farmers";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Tabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tabs;

export const GovHome = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#28b266" />
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.imageStyling}
              source={require("../../../assets/doctor.png")}
            />
            <Text style={styles.names}>
              <Text style={styles.hiStyle}>Hi </Text>
              Minister Yann
            </Text>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <Text style={styles.lowerTitle}>Categories</Text>
          <View style={{ height: "100%" }}>
            <Navigator
              // tabBar={(props) => <CustomTabBar {...props} />}
              screenOptions={{
                headerShown: false,
                alignSelf: "center",
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#000000",
                tabBarItemStyle: {
                  backgroundColor: "#28b266",
                  borderRadius: 10,
                  justifyContent: "space-between",
                  marginHorizontal: 5,
                  marginVertical: 10,
                },
                tabBarIndicatorStyle: {
                  backgroundColor: "#ffffff",
                  width: 80,
                  height: 4,
                  borderRadius: 5,
                  marginHorizontal: 16,
                  marginBottom: 6,
                  alignSelf: "center",
                },
                tabBarStyle: {
                  backgroundColor: "#ffffff",
                  borderBottomWidth: 2,
                  borderColor: "#ffffff",
                },
              }}
            >
              <Screen name="pigs" component={TotalPigs} />
              <Screen name="farms" component={Farms} />
              <Screen name="users" component={Farmers} />
            </Navigator>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  main: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#ffffff",
    height: height,
    width: width,
    // flex: 1,
  },
  container: {
    padding: "10@s",
    backgroundColor: "#28b266",
    paddingVertical: "20@s",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },
  imageStyling: {
    width: "60@s",
    height: "60@s",
    borderRadius: "50@s",
  },
  names: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "20@s",
    marginLeft: "16@s",
  },
  hiStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: "16@s",
  },
  lowerContainer: {
    padding: "10@s",
  },
  lowerTitle: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "24@s",
  },
});
