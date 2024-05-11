import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Features/authSlice";
import { RoundedButton } from "../Components/Buttons/RoundedButton";
import { getItemAsync } from "expo-secure-store";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").height;

export const Details = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  const [token, setToken] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const getUser = async () => {
      const storedToken = await getItemAsync("token");
      const storedUserData = await getItemAsync("logindata");

      if (storedToken) {
        setUserData(JSON.parse(storedUserData));
      }
      setToken(storedToken);
    };

    getUser();
  }, []);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!userData) {
    return <Text>Loading user data...</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.headings}>Names</Text>
          <Text style={styles.texts}>
            {" "}
            {userData?.firstName} {userData?.lastName}{" "}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.headings}>Telephone</Text>
          <Text style={styles.texts}> {userData?.phoneNumber} </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.headings}>Email</Text>
          <Text style={styles.texts}> {userData?.email} </Text>
        </View>
        <TouchableOpacity>
          <RoundedButton text={"Logout"} action={handleLogout} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#ffffff",
    height: height,
  },
  main: {
    padding: "20@s",
  },
  content: {
    // marginVertical: "10@S",
    paddingVertical: "5@s",
  },
  headings: {
    fontSize: "14@s",
    fontFamily: "Poppins_500Medium",
  },
  texts: {
    fontSize: "18@s",
    fontFamily: "Poppins_800ExtraBold",
  },
});
