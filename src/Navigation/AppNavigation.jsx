import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../Screens/Login";
import { Register } from "../Screens/Register";
import { MainNavigation } from "./MainNavigation";
import { Splash } from "../Screens/Splash";
import { Onboarding1 } from "../Screens/Onboardind1";
import { Onboarding2 } from "../Screens/Onboarding2";
import { Onboarding3 } from "../Screens/Onboarding3";
import { login as storeInfo, tokenStore } from "../Features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { loginSuccess } from "../Features/authSlice";
import { Home } from "../Screens/Home";
// import { tokenStore } from "../Features/authSlice";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  // console.log(logged, "login state");

  useEffect(() => {
    async function initializeApp() {
      const storedToken = await getItemAsync("token");
      const completed = await getItemAsync("onboardingComplete");
      const userDataJson = await getItemAsync("logindata");

      if (storedToken && userDataJson) {
        const userData = JSON.parse(userDataJson);
        dispatch(tokenStore(storedToken));
        dispatch(loginSuccess(userData));
      }

      setOnboardingComplete(completed === "true");
      setIsLoading(false);

      dispatch(tokenStore(storedToken || ""));
      setOnboardingComplete(completed === "true");
      setToken(storedToken);
      setIsLoading(false);
    }

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!onboardingComplete ? (
        <>
          <Screen name="Onboarding1" component={Onboarding1} />
          <Screen name="Onboarding2" component={Onboarding2} />
          <Screen
            name="Onboarding3"
            component={Onboarding3}
            initialParams={{ setOnboardingComplete }}
          />
        </>
      ) : isLoggedIn ? (
        <Screen name="HOME" component={MainNavigation} />
      ) : (
        <>
          <Screen name="Login" component={Home} />
          <Screen name="Signup" component={Register} />
        </>
      )}
    </Navigator>
  );
};
