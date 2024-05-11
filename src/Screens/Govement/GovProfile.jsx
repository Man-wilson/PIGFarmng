import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Features/authSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { ScaledSheet } from "react-native-size-matters";
import {
  FontAwesome,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { Details } from "../Details";
import { EditDetails } from "../EditDetails";
import { Security } from "../Security";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tab;

export const GovProfile = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUser = async () => {
      const tokenStored = await getItemAsync("token");
      const storedUserData = await getItemAsync("logindata");
      if (tokenStored) {
        setUserData(JSON.parse(storedUserData));
      }
      setToken(tokenStored);
    };

    // console.log(userData);

    getUser();
  }, []);

  if (!userData) {
    return <Text>Loading user data...</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#28b265" />
      <View style={styles.Container}>
        <View style={styles.firstContainer}>
          <MaterialIcons
            style={styles.image}
            name="account-circle"
            size={90}
            color="#2381a2"
          />
        </View>
        <View style={styles.NamesSection}>
          <Text style={styles.names}>
            {" "}
            {userData?.firstName} {userData?.lastName}{" "}
          </Text>
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
                backgroundColor: "#454545",
                borderRadius: 20,
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 20,
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#000000",
                width: 30,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 50,
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
            <Screen name="details" component={Details} />
            <Screen name="edit" component={EditDetails} />
            <Screen name="security" component={Security} />
          </Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  Container: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#28b265",
  },
  firstContainer: {
    marginVertical: "30@s",
    paddingHorizontal: "10@s",
    alignSelf: "center",
  },
  image: {
    borderRadius: "50@s",
    width: "90@s",
    height: "90@s",
    borderWidth: "10@s",
    borderColor: "#ffffff",
    alignSelf: "center",
  },
  NamesSection: {
    alignSelf: "center",
    paddingHorizontal: "10@s",
  },
  names: {
    fontSize: "20@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#ffffff",
  },
});
