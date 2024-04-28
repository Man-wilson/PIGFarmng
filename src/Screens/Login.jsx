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
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import { LoginTextFields } from "../Components/TextFields/LoginTextFields";
import { Button } from "../Components/Buttons/Button";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { loginUser } from "../Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Login = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authentication.isLoading);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const error = useSelector((state) => state.authentication.error);

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password Screen
    navigation.navigate("ForgotPassword");
  };

  const handleSignUp = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Validation", "Please enter both username and password.");
      return;
    }
    dispatch(loginUser({ username, password }))
      .then(() => {
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#3ab976" />
      <View style={styles.Container}>
        <View>
          {/* <Image
              style={styles.image}
              source={require("../../assets/PIG FARMING Icon2 (1).png")}
            /> */}
        </View>
        <Text style={styles.head1}>Sign in</Text>
        {/* <Text>Please sign in to continue</Text> */}
        <ScrollView>
          <KeyboardAvoidingView>
            <View style={styles.main}>
              {/* <Text style={styles.texts}>Sign in</Text> */}
              <LoginTextFields
                OnChangeText={setUsername}
                Placeholder="Username"
                icon={<MaterialIcons name="person" size={24} color="black" />}
                value={username}
              />

              <LoginTextFields
                OnChangeText={setPassword}
                Placeholder="Password"
                secureTextEntry={viewPassword}
                value={password}
                icon={
                  <TouchableOpacity
                    onPress={() => setViewPassword(!viewPassword)}
                  >
                    <FontAwesome name="eye" size={24} color="black" />
                  </TouchableOpacity>
                }
              />
              {error && (
                <Text style={styles.errorText}>
                  {error.message || "An unknown error occurred"}
                </Text>
              )}
              <TouchableOpacity
                onPress={handleForgotPassword}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  {isLoading ? "Logging in..." : "Login"}{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignUp} style={styles.signUp}>
                <Text style={styles.signUpText}>
                  Don't have an account? {""} Sign Up
                </Text>
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
    marginBottom: "10@s",
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
    borderRadius: "20@s",
    backgroundColor: "#ffffff",
    height: height,
    paddingVertical: "10@s",
    marginTop: "90@s",
    paddingTop: "50@s",
    padding: "20@s",
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
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3ab976",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
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

  forgotPassword: {
    marginTop: "15@s",
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "crimson",
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
  },
  signUp: {
    marginTop: "40@s",
    alignItems: "center",
  },
  signUpText: {
    color: "crimson",
    fontSize: "16@s",
    fontFamily: "Poppins_800ExtraBold",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: "10@s",
  },
});
