import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScaledSheet, s } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import { CreateFarm } from "./CreateFarm";
import { Login } from "./Login";
import { FarmerHome } from "./FarmerHome";
import { HomeContainer } from "../Components/Containers/HomeContainer";
import { CustomCalendar } from "../Components/Callender/CustomCalender";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Home = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [farm, setFarm] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      const tokenStored = await getItemAsync("token");
      const userDataStored = await getItemAsync("logindata");
      if (userDataStored) {
        setUserData(JSON.parse(userDataStored));
      }
      setToken(tokenStored);
    };

    getUser();
  }, []);

  // console.log(userData);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#28b266" />
      <View style={{ backgroundColor: "#28b266", padding: 10 }}>
        <View style={styles.profileContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              style={styles.imageStyling}
              source={require("../../assets/doctor.png")}
            />
            <Text style={styles.names}>
              <Text style={styles.hiStyle}>Hi </Text>
              {userData.firstName} {userData.lastName}{" "}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons
              style={styles.icon}
              name="notifications-outline"
              size={30}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
        <CustomCalendar />
      </View>
      <View style={styles.container}>
        <View style={styles.containerUpdates}>
          <View style={styles.insideUpdates}>
            <View>
              <FontAwesome6 name="user-doctor" size={44} color="#f0f1f4" />
            </View>
            <View style={styles.containerTexts}>
              <Text style={styles.texts}>Keep it up</Text>
              <Text style={styles.texts}>You're doing good work...</Text>
            </View>
          </View>
          <View style={styles.lowerUpdates}>
            <View>
              <Text style={styles.lowerTexts}>Total Tasks</Text>
              <Text style={styles.numberTasks}>4</Text>
            </View>
            <View style={styles.separator}></View>
            <View>
              <Text style={styles.lowerTexts}>Completed Tasks</Text>
              <Text style={styles.numberTasks}>14</Text>
            </View>
          </View>
        </View>
        <Text style={styles.heading}>Tasks</Text>
        <ScrollView horizontal>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="CMU-Africa Ltd"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="Green Pig farming Ltd"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="Pig selling company Ltd"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="DPSD Company Ltd"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "0@s",
    paddingHorizontal: "10@s",
    backgroundColor: "#ffffff",
    height: height,
    width: width,
    // marginBottom: "10@s",
  },
  homeView: {
    flexDirection: "row",
  },
  insideHome: {
    // margin: "5@s",
    // width: "200@s",
    // height: "200@s",
    paddingRight: "10@s",
  },
  scrollViewContent: {
    paddingBottom: "140@s",
  },
  imageStyling: {
    width: "50@s",
    height: "50@s",
    borderRadius: "50@s",
    // alignSelf: "center",
    // backgroundColor: "#ffffff",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  names: {
    marginHorizontal: "10@s",
    fontSize: "18@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#ffffff",
  },
  hiStyle: {
    color: "black",
    fontSize: "30@s",
    fontFamily: "Poppins_400Regular",
    // fontWeight: 'bold',
  },

  icon: {
    borderRadius: "50@s",
    borderWidth: "2@s",
    borderColor: "#FFFFFF",
    textAlign: "center",
    padding: "3@s",
  },
  containerUpdates: {
    marginVertical: "10@s",
    borderRadius: "10@s",
    backgroundColor: "#28b266",
  },
  insideUpdates: {
    padding: "20@s",
    flexDirection: "row",
    alignItems: "center",
  },
  containerTexts: {
    marginHorizontal: "20@s",
  },
  texts: {
    fontSize: "15@s",
    fontFamily: "Poppins_400Regular",
    color: "#f0f1f4",
    fontWeight: "bold",
  },
  lowerUpdates: {
    paddingHorizontal: "20@s",
    paddingBottom: "20@s",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowerTexts: {
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#000000",
  },
  numberTasks: {
    fontSize: "14@s",
    fontFamily: "Poppins_800ExtraBold",
    color: "#f0f1f4",
    textAlign: "center",
  },
  separator: {
    height: "50@s",
    width: "2@s",
    backgroundColor: "#dddddd",
  },
  heading: {
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
  },
});
