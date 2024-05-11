import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { CreateFarm } from "./CreateFarm";
import { Pigs } from "./Pigs";
import { CustomTabBar } from "../Components/Containers/CustomTabBar";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Tabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tabs;

export const Farm = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      {/* <ScrollView> */}
      <StatusBar style="black" backgroundColor="#28b266" />
      <View style={styles.container}>
        <View style={styles.firstview}>
          <Text style={styles.names}>
            This is where we set all information related to a farm
          </Text>
          {/* <Ionicons name="menu" size={24} color="#0E5A64" /> */}
        </View>
        <View
          style={{
            height: "100%",
          }}
        >
          <Navigator
            // tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
              headerShown: false,
              alignSelf: "center",
              tabBarActiveTintColor: "#68cce5",
              tabBarInactiveTintColor: "#f7dca5",
              tabBarItemStyle: {
                backgroundColor: "#0E5A64",
                borderRadius: 30,
                justifyContent: "space-between",
                margin: 10,
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#FFFFFF",
                width: 30,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 73,
                marginBottom: 6,
                alignSelf: "center",
              },
              tabBarStyle: {
                backgroundColor: "#28b266",
                borderBottomWidth: 2,
                borderColor: "#ffffff",
              },
            }}
          >
            <Screen name="create Farm" component={CreateFarm} />
            <Screen name="update Pigs" component={Pigs} />
          </Navigator>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "#28b266",
    paddingTop: "10@s",
    margin: "0@s",
    // height: height,
  },
  firstview: {
    paddingVertical: "5@s",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Firsttext: {
    fontFamily: "Poppins_500Medium",
    fontSize: "30@s",
    paddingTop: "20@s",
  },
  names: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "18@s",
    // fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    paddingHorizontal: "10@s",
  },
});
