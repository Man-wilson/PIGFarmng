import {
  Dimensions,
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { AddTextField } from "../Components/TextFields/AddTextField";
import { RoundedButton } from "../Components/Buttons/RoundedButton";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").height;

export const EditDetails = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.component}>
            <AddTextField
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First name"
            />
          </View>
          <View style={styles.component}>
            <AddTextField
              onChangeText={setLastName}
              value={lastName}
              placeholder="Last name"
            />
          </View>

          <View style={styles.component}>
            <AddTextField
              style={styles.input}
              onChangeText={setTelephone}
              value={telephone}
              placeholder="Telephone"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.component}>
            <AddTextField
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.component}>
            <AddTextField
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <RoundedButton text={"Update Account"} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: "10@s",
    paddingHorizontal: "20@s",
    height: height,
    marginBottom: "270@s",
  },
  component: {
    marginVertical: "10@s",
    alignSelf: "center",
  },
});
