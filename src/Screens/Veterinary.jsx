import React from "react";
import { View, Text, Dimensions, ScrollView, Button } from "react-native";
import { VetsComponent } from "../Components/Containers/VetsComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../Features/authSlice";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Veterinary = () => {
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
      <StatusBar style="light" backgroundColor="#353d37" />
      <View style={styles.container}>
        <Text style={styles.vetHeader}>Choose Your Desired Veterinary</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={{ marginVertical: 10 }}>
            <VetsComponent
              imageUrl={require("../../assets/doctor.png")}
              title="Mandela Yann"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              phoneNumber="0785161514"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <VetsComponent
              imageUrl={require("../../assets/vet.jpg")}
              title="Michael Wilson"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              phoneNumber="0785161514"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <VetsComponent
              imageUrl={require("../../assets/doctor.png")}
              title="Vladmir Wilson"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              phoneNumber="0785161514"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <VetsComponent
              imageUrl={require("../../assets/vet.jpg")}
              title="DPSD Project"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              phoneNumber="0785161514"
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <VetsComponent
              imageUrl={require("../../assets/doctor.png")}
              title="Micheal Yann"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              phoneNumber="0785161514"
            />
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
    backgroundColor: "#353d37",
    height: height,
    width: width,
  },
  scrollViewContent: {
    paddingBottom: "100@s",
  },
  vetHeader: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "20@s",
    textAlign: "center",
    color: "#28b265",
  },
});
