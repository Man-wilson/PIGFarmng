import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTextField } from "../Components/TextFields/AddTextField";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Button } from "../Components/Buttons/Button";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { RoundedButton } from "../Components/Buttons/RoundedButton";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const CreateFarm = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/PIG FARMING Icon2 (1).png")}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.Title}>Create a farm</Text>
        </View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Farm name"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Size of the famr"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Owner of the Farm"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Phone"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Province"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"District"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Sector"} />
            </View>
            <View style={styles.textInputs}>
              <AddTextField placeholder={"Zip Code"} />
            </View>
            <RoundedButton text={"register a farm"} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  Container: {
    margin: "0@s",
    padding: "0@s",
    height: height,
    width: width,
    marginBottom: "10@s",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  Title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "30@s",
    marginVertical: "30@s",
    alignSelf: "center",
  },
  textInputs: {
    marginVertical: "5@s",
  },
});
