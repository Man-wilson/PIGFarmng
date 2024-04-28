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
import { AddTextField } from "../Components/TextFields/AddTextField";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Button } from "../Components/Buttons/Button";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { RoundedButton } from "../Components/Buttons/RoundedButton";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Pigs = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });
  const [token, setToken] = useState();
  //   const [userData, setUserData] = useState();
  const [data, setData] = useState({
    breed: "",
    gender: "",
    weight: "",
    birthDate: "",
    healthStatus: "",
    farmId: "",
  });

  const navigation = useNavigation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (date) => {
    const parts = date.split("-");
    if (parts.length === 3) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return date;
  };

  const handleNumericInput = (text, field) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setData((prevData) => ({
        ...prevData,
        [field]: numericValue,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [field]: "",
      }));
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const fetchedToken = await getItemAsync("token");
      setToken(fetchedToken);
    };

    getToken();
  }, []);

  //   console.log(JSON.stringify(data), "Final data to be sent");

  //   useEffect(() => {
  //     const getUser = async () => {
  //       let token = await getItemAsync("token");
  //       let user = await getItemAsync("logindata");
  //       setToken(token);
  //       setUserData(JSON.parse(user));
  //     };

  //     getUser();
  //   }, []);

  if (!fontsLoaded || !token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const createPig = async () => {
    // Check if any required fields are empty
    if (
      !data.breed ||
      !data.gender ||
      !data.weight ||
      !data.birthDate ||
      !data.healthStatus ||
      data.farmId === null
    ) {
      alert("Please fill all the fields before submitting.");
      return; // Exit the function to prevent submitting
    }

    try {
      const response = await axios.post(
        "https://pig-farming-backend.onrender.com/api/pigs",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Display a success message
        alert("Pig created successfully.");

        navigation.navigate("FarmerHome");

        // Reset data
        setData({
          breed: "",
          gender: "",
          weight: "",
          birthDate: "",
          healthStatus: "",
          farmId: null,
        });
      }
    } catch (error) {
      console.error(
        "Failed to create pig:",
        error.response ? error.response.data : error
      );
      alert(
        "Failed to create pig: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  //   console.log(userData);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/PIG FARMING Icon2 (1).png")}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.Title}>Pigs Information</Text>
        </View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Breed"}
                value={data.breed}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    breed: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder="Weight (kg)"
                value={data.weight.toString()}
                onChangeText={(text) => handleNumericInput(text, "weight")}
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder="Gender"
                value={data.gender}
                onChangeText={(text) =>
                  setData({ ...data, gender: capitalizeFirstLetter(text) })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder="Birthdate (YYYY-M-D)"
                value={data.birthDate}
                onChangeText={(text) =>
                  setData({ ...data, birthDate: formatDate(text) })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"health status"}
                value={data.healthStatus}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    healthStatus: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder="Farm ID"
                value={data.farmId ? data.farmId.toString() : ""}
                onChangeText={(text) => handleNumericInput(text, "farmId")}
              />
            </View>
            <RoundedButton text={"update"} action={createPig} />
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
    fontSize: "25@s",
    marginVertical: "10@s",
    alignSelf: "center",
  },
  textInputs: {
    marginVertical: "5@s",
  },
});
