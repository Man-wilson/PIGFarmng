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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Login = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
  });

  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#3ab976" />
      <ScrollView>
        <View style={styles.Container}>
          <View>
            {/* <Image
              style={styles.image}
              source={require("../../assets/PIG FARMING Icon2 (1).png")}
            /> */}
          </View>
          <Text style={styles.head1}>Sign in</Text>
          {/* <Text>Please sign in to continue</Text> */}
          <KeyboardAvoidingView>
            <View style={styles.main}>
              {/* <Text style={styles.texts}>Sign in</Text> */}
              <LoginTextFields
                Onchange={(text) => setTel(text)}
                Placeholder={"email-address"}
                icon={
                  <MaterialIcons name="contact-page" size={23} color="black" />
                }
              />
              {/* <Text style={styles.texts}>Password</Text> */}
              <LoginTextFields
                Onchange={(text) => setPassword(text)}
                Placeholder={"Enter your password"}
                secureTextEntry={viewPassword}
                icon={
                  <TouchableOpacity
                    onPress={() => setViewPassword(!viewPassword)}
                  >
                    <FontAwesome name="eye" size={23} color="black" />
                  </TouchableOpacity>
                }
              />
              <View
                style={{
                  marginVertical: 10,
                }}
              ></View>
              <View style={styles.forgotpswd}>
                <TouchableOpacity>
                  <Text style={styles.forgotPswddText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                // loading={isLoading}
                // text={"Sign in"}
                icons={<AntDesign name="arrowright" size={24} color="white" />}
                // action={handleLogin}
              />
              <Text style={{ fontWeight: "bold" }}>Don't have an account?</Text>
              <TouchableOpacity>
                <Text style={styles.forgotPswddText}>Register</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
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
