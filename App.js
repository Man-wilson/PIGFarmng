import react, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootNavigation } from "./src/Navigation/RootNavigation";
import { Provider } from "react-redux";
import { store } from "./src/Features/store";
// import * as Updates from "expo-updates";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_800ExtraBold,
  Poppins_400Regular_Italic,
  Poppins_300Light_Italic,
} from "@expo-google-fonts/poppins";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light_Italic,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_800ExtraBold,
  });

  // async function onFetchUpdateAsync() {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();

  //     if (update.isAvailable) {
  //       await Updates.fetchUpdateAsync();
  //       await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     // You can also add an alert() to see the error message in case of an error when fetching updates.
  //     alert(`Error fetching latest Expo update: ${error}`);
  //   }
  // }

  // useEffect(() => {
  //   onFetchUpdateAsync();
  // }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
