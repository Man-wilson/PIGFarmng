import React, { useEffect, useState } from "react";
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
import { AddTextField } from "../../Components/TextFields/AddTextField";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Button } from "../../Components/Buttons/Button";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { RoundedButton } from "../../Components/Buttons/RoundedButton";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const CreateHealthRecords = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const initialState = {
    date: "",
    description: "",
    treatment: "",
    pigId: "",
  };

  const [data, setData] = useState(initialState);

  const navigation = useNavigation();

  useEffect(() => {
    const getUser = async () => {
      let token = await getItemAsync("token");
      let user = await getItemAsync("logindata");
      setToken(token);
      setUserData(JSON.parse(user));
    };

    getUser();
  }, []);

  if (!fontsLoaded || !token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const createHealthData = async () => {
    if (!token || !userData) {
      setMessage("Token or user data is not available.");
      setIsError(true);
      return;
    }

    // Prepare data with converted pigId
    const preparedData = {
      ...data,
      pigId: parseInt(data.pigId, 10) || 0, // Ensure pigId is an integer or 0
    };

    console.log("Data to send:", preparedData);
    try {
      const response = await axios.post(
        "https://pig-farming-backend.onrender.com/api/healthRecords",
        preparedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      if (response.status === 201) {
        setMessage("The health record was successfully created.");
        setIsError(false);
        setData(initialState); // Reset the form data
        setTimeout(() => setMessage(""), 5000); // Clear message after 5 seconds
        navigation.goBack();
      }
    } catch (error) {
      setMessage(
        `Error occurred: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      setIsError(true);
      console.error(
        "Failed to create health record:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/PIG FARMING Icon2 (1).png")}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.Title}>Update Health Records</Text>
          {message && (
            <Text style={isError ? styles.errorText : styles.successText}>
              {message}
            </Text>
          )}
        </View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.textInputs}>
              {/* <AddTextField
                placeholder={"Farm name"}
                value={data.name}
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    name: text,
                  }))
                }
              /> */}
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Date of treatment"}
                value={data.date}
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    date: text,
                  }))
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Description"}
                value={data.description}
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: text,
                  }))
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Treatment"}
                value={data.treatment}
                onChangeText={(text) =>
                  setData((prevData) => ({
                    ...prevData,
                    treatment: text,
                  }))
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Pig Id"}
                value={data.pigId}
                onChangeText={(text) => {
                  setData((prevData) => ({
                    ...prevData,
                    pigId: text,
                  }));
                }}
              />
            </View>
            <RoundedButton
              text={"Save Health records"}
              action={createHealthData}
            />
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
    // marginBottom: "@s",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "white",
    paddingTop: "30@s",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  Title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "25@s",
    marginVertical: "20@s",
    alignSelf: "center",
  },
  textInputs: {
    marginVertical: "5@s",
  },
  successText: {
    color: "green",
    fontSize: "18@s",
    textAlign: "center",
    padding: "10@s",
  },
  errorText: {
    color: "red",
    fontSize: "18@s",
    textAlign: "center",
    padding: "10@s",
  },
});
