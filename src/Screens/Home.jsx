import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { CreateFarm } from "./CreateFarm";
import { Login } from "./Login";
import { FarmerHome } from "./FarmerHome";
import { HomeContainer } from "../Components/Containers/HomeContainer";
import { CustomCalendar } from "../Components/Callender/CustomCalender";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Home = () => {
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
      <StatusBar style="black" backgroundColor="#28b266" />
      <View style={{ backgroundColor: "#ffffff" }}>
        {/* <Image
          style={styles.imageStyling}
          source={require("../../assets/PIG FARMING (1).png")}
        /> */}
        <CustomCalendar />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
          </View>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
          </View>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
          </View>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
          </View>
          <View style={styles.homeView}>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
                description="Gasabo-Kimironko"
                number="+250785161514"
              />
            </View>
            <View style={styles.insideHome}>
              <HomeContainer
                imageSource={require("../../assets/3d.jpg")}
                title="New born pigs"
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
    padding: "10@s",
    backgroundColor: "#ffffff",
    height: height,
    width: width,
    // marginBottom: "10@s",
  },
  homeView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insideHome: {
    // margin: "5@s",
    width: "160@s",
  },
  scrollViewContent: {
    paddingBottom: "140@s",
  },
  imageStyling: {
    width: "80@s",
    height: "80@s",
    alignSelf: "center",
    // backgroundColor: "#ffffff",
  },
});
