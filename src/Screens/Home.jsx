import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { CreateFarm } from "./CreateFarm";
import { Login } from "./Login";
import { FarmerHome } from "./FarmerHome";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

export const Home = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_400Regular });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#F2F1F1" />
      <View style={styles.container}>
        <View>
          <Text>Welcome Back WIden</Text>
        </View>
        <View style={{ height: "100%" }}>
          <Navigator
            screenOptions={{
              headerShown: false,
              alignSelf: "center",
              tabBarActiveTintColor: "#0E5A64",
              tabBarInactiveTintColor: "#ADADAD",
              tabBarIndicatorStyle: {
                backgroundColor: "#0E5A64",
                width: 30,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 81,
                marginBottom: 6,
              },
              tabBarStyle: {
                backgroundColor: "#F2F1F1",
                borderBottomWidth: 1,
                borderColor: "black",
              },
            }}
          >
            <Screen name="Home" component={FarmerHome} />
            {/* <Screen name="Login" component={Login} /> */}
          </Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
