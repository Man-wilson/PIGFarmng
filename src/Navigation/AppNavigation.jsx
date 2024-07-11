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
import { VetProfile } from "../Screens/Veterinary/VetProfile";
import { Notifications } from "../Screens/Veterinary/Notifications";
import { HealthRecords } from "../Screens/Veterinary/HealthRecords";
import { CreateFarm } from "../Screens/CreateFarm";
import { Details } from "../Screens/Details";
import { EditDetails } from "../Screens/EditDetails";
import { Farm } from "../Screens/Farm";
import { FarmerHome } from "../Screens/FarmerHome";
import { Pigs } from "../Screens/Pigs";
import { Profile } from "../Screens/Profile";
import { Security } from "../Screens/Security";
import { Veterinary } from "../Screens/Veterinary";
import { GovHome } from "../Screens/Govement/GovHome";
// import { tokenStore } from "../Features/authSlice";

const Stack = createNativeStackNavigator();

const { Navigator, Screen } = Stack;

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
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
      // setToken(storedToken);
      setIsLoading(false);

      dispatch(tokenStore(storedToken || ""));
      setOnboardingComplete(completed === "true");
      setToken(storedToken);
      setIsLoading(false);
    }

    initializeApp();
  }, [dispatch]);

  // if (isLoading) {
  //   return <Splash />;
  // }

  if (!splashComplete) {
    return <Splash onComplete={() => setSplashComplete(true)} />;
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!splashComplete ? (
        <Screen name="Splash" component={Splash} />
      ) : !onboardingComplete ? (
        <>
          <Screen name="Onboarding1" component={Onboarding1} />
          <Screen name="Onboarding2" component={Onboarding2} />
          <Screen name="Onboarding3" component={Onboarding3} />
        </>
      ) : isLoggedIn ? (
        <>
          <Screen name="Main" component={MainNavigation} />
          <Screen name="HealthRecords" component={HealthRecords} />
          <Screen name="Notifications" component={Notifications} />
          <Screen name="VetProfile" component={VetProfile} />
          <Screen name="CreateFarm" component={CreateFarm} />
          <Screen name="Details" component={Details} />
          <Screen name="EditDetails" component={EditDetails} />
          <Screen name="Farm" component={Farm} />
          <Screen name="FarmerHome" component={FarmerHome} />
          <Screen name="Home" component={Home} />
          <Screen name="Pigs" component={Pigs} />
          <Screen name="Profile" component={Profile} />
          <Screen name="Security" component={Security} />
          <Screen name="Veterinary" component={Veterinary} />
        </>
      ) : (
        <>
          <Screen name="Login" component={Login} />
          <Screen name="Signup" component={Register} />
        </>
      )}
    </Navigator>
  );
};
