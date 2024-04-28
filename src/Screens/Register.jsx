import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  //   Button,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialIcons,
  FontAwesome,
  AntDesign,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import { LoginTextFields } from "../Components/TextFields/LoginTextFields";
import { Button } from "../Components/Buttons/Button";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Register = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });

  const [viewPassword, setViewPassword] = useState("");
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    roleId: null,
  });

  const navigation = useNavigation();
  // const userDataRef = useRef(userData);

  const roleMappings = {
    admin: 1,
    pig_farmer: 2,
    veterinarian: 3,
    gov_official: 4,
  };

  const dropdownOptions = [
    { label: "Admin", value: "admin" },
    { label: "Pig Farmer", value: "pig_farmer" },
    { label: "Veterinarian", value: "veterinarian" },
    { label: "Gov Official", value: "gov_official" },
  ];

  // console.log("Registering user with data:", userData);

  const handleInputChange = (name, value) => {
    if (name === "roleId") {
      value = roleMappings[value];
    }
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log("userData at registration:", userData);
  const registerUser = async () => {
    try {
      const response = await axios.post(
        "https://pig-farming-backend.onrender.com/api/users",
        userData
      );
      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully.");
        navigation.goBack();
      }
    } catch (error) {
      console.error(
        "Failed to register user:",
        error.response ? error.response.data : error
      );
      Alert.alert("Error", "Failed to register user.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#3ab976" />
      <View style={styles.Container}>
        <Text style={styles.head1}>Register</Text>
        <Text style={{ fontSize: 15, paddingLeft: 10, color: "white" }}>
          Create your new account
        </Text>
        <ScrollView contentContainerStyle={{ height: height }}>
          <KeyboardAvoidingView>
            <View style={styles.main}>
              <LoginTextFields
                onValueChange={(text) => handleInputChange("roleId", text)}
                value={
                  userData.roleId
                    ? Object.keys(roleMappings).find(
                        (key) => roleMappings[key] === userData.roleId
                      )
                    : ""
                }
                Placeholder="Choose your role please"
                isDropdown
                dropdownOptions={dropdownOptions}
                icon={
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={44}
                    color="black"
                  />
                }
              />

              <LoginTextFields
                OnChangeText={(text) => handleInputChange("username", text)}
                value={userData.username}
                Placeholder={"Username"}
                icon={
                  <MaterialIcons name="contact-page" size={23} color="black" />
                }
              />
              <LoginTextFields
                OnChangeText={(text) => handleInputChange("firstName", text)}
                value={userData.firstName}
                Placeholder={"First name"}
                icon={
                  <MaterialIcons name="contact-page" size={23} color="black" />
                }
              />
              <LoginTextFields
                OnChangeText={(text) => handleInputChange("lastName", text)}
                value={userData.lastName}
                Placeholder={"Second name"}
                icon={
                  <MaterialIcons name="contact-page" size={23} color="black" />
                }
              />
              <LoginTextFields
                OnChangeText={(text) => handleInputChange("phoneNumber", text)}
                value={userData.phoneNumber}
                Placeholder={"Mobile"}
                icon={<FontAwesome5 name="mobile" size={24} color="black" />}
              />
              <LoginTextFields
                OnChangeText={(text) => handleInputChange("email", text)}
                value={userData.email}
                Placeholder={"Email address"}
                icon={<MaterialIcons name="email" size={24} color="black" />}
              />
              <LoginTextFields
                OnChange={(text) => setViewPassword(text)}
                OnChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={true}
                value={userData.password}
                Placeholder={"Password"}
                // secureTextEntry={""}
                icon={
                  <TouchableOpacity
                    onPress={() => setViewPassword(!viewPassword)}
                  >
                    <FontAwesome5 name="lock" size={24} color="black" />
                  </TouchableOpacity>
                }
              />
              <View
                style={{
                  marginVertical: 10,
                }}
              ></View>
              <Button
                // loading={isLoading}
                // text={"Sign in"}
                icons={<AntDesign name="arrowright" size={24} color="white" />}
                action={registerUser}
              />
              <Text style={{ fontWeight: "bold" }}>
                Already have an account?
              </Text>
              <TouchableOpacity>
                <Text style={styles.forgotPswddText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  Container: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#3ab976",
    height: height,
    width: width,
    // marginBottom: "10@s",
  },
  image: {
    width: "120@s",
    height: "100@s",
    alignSelf: "center",
    marginTop: "20@s",
  },
  head1: {
    fontFamily: "Poppins_800ExtraBold",
    // alignSelf: "center",
    fontSize: "25@s",
    fontWeight: "bold",
    paddingTop: "30@s",
    color: "white",
    paddingHorizontal: "10@s",
  },
  main: {
    borderTopRightRadius: "30@s",
    borderTopLeftRadius: "30@s",
    backgroundColor: "#ffffff",
    // height: height,
    paddingVertical: "10@s",
    marginTop: "20@s",
    paddingTop: "50@s",
    padding: "20@s",
    // marginBottom: "50@s",
  },
  texts: {
    fontFamily: "Poppins_500Medium",
    fontSize: "15@s",
    marginLeft: "15@s",
    color: "#2E3A59",
  },
  forgotpswd: {
    flexDirection: "row",
    marginBottom: "20@s",
    alignSelf: "flex-end",
  },
  forgotPswddTexts: {
    fontSize: "18@s",
    fontFamily: "Poppins_500Medium",
  },
  forgotPswddText: {
    color: "crimson",
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "16@s",
  },
});
