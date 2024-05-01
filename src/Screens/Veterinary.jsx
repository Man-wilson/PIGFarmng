import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView, Button } from "react-native";
import { VetsComponent } from "../Components/Containers/VetsComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../Features/authSlice";
import { getItemAsync } from "expo-secure-store";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Veterinary = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedToken = await getItemAsync("token");
        setToken(storedToken);

        if (!storedToken) {
          console.error("No token found, authorization required.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/users/role/3",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log(userData);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#353d37" />
      <View style={styles.container}>
        <Text style={styles.vetHeader}>Choose Your Desired Veterinary</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {users.map((vet, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <VetsComponent
                imageUrl={
                  vet.imageUrl
                    ? { uri: vet.imageUrl }
                    : require("../../assets/doctor.png")
                }
                title={`${vet.firstName} ${vet.lastName}`}
                description={vet.phoneNumber}
                phoneNumber={vet.phoneNumber}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "0@s",
    padding: "10@s",
    backgroundColor: "#353d37",
    height: height,
    width: width,
  },
  scrollViewContent: {
    paddingBottom: "100@s",
  },
  vetHeader: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "20@s",
    textAlign: "center",
    color: "#28b265",
  },
});
