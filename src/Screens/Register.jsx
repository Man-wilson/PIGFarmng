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

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Register = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#3ab976" />
      <ScrollView>
        <View style={styles.Container}>
          <Text style={styles.head1}>Register</Text>
          <Text style={{ fontSize: 15, paddingLeft: 10, color: "white" }}>
            Create your new account
          </Text>
          <KeyboardAvoidingView>
            <View style={styles.main}>
              <LoginTextFields
                Onchange={(text) => setTel(text)}
                Placeholder={"Username"}
                icon={
                  <MaterialIcons name="contact-page" size={23} color="black" />
                }
              />
              <LoginTextFields
                Onchange={(text) => setTel(text)}
                Placeholder={"Mobile"}
                icon={<FontAwesome5 name="mobile" size={24} color="black" />}
              />
              <LoginTextFields
                Onchange={(text) => setTel(text)}
                Placeholder={"Email address"}
                icon={<MaterialIcons name="email" size={24} color="black" />}
              />
              <LoginTextFields
                Onchange={""}
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
                // action={handleLogin}
              />
              <Text style={{ fontWeight: "bold" }}>
                Already have an account?
              </Text>
              <TouchableOpacity>
                <Text style={styles.forgotPswddText}>Sign in</Text>
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
