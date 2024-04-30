import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { HealthRecord } from "../../Components/Containers/HealthRecord";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";

export const HealthRecords = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });
  const [token, setToken] = useState(null);
  const [pigId, setPigId] = useState(""); // State to hold the pigId input
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch token
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getItemAsync("token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // Handler for fetching health records
  const fetchHealthRecords = async () => {
    if (token && pigId) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pig-farming-backend.onrender.com/api/healthRecords/pig/${pigId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecords(response.data || []);
        console.log(response.data, "RECORDS information");
        setPigId(""); // Clearing the input after fetching
      } catch (error) {
        console.error(
          "Failed to get records:",
          error.response ? JSON.stringify(error.response.data) : error.message
        );
        setRecords([]); // we have to clear records if fetch fails
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Token or Pig ID is missing.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" backgroundColor="#dbdcde" />
      <View style={styles.main}>
        <Text style={styles.heading}>HEALTH RECORDS</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPigId}
          value={pigId}
          placeholder="Enter Pig ID"
          keyboardType="numeric"
        />
        <Button
          title="Fetch Records"
          onPress={fetchHealthRecords}
          disabled={!pigId}
        />
        {loading ? (
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginVertical: 20,
              fontFamily: "Poppins_800ExtraBold",
            }}
          >
            Loading Health records...
          </Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {records.length > 0 ? (
              records.map((record, index) => (
                <HealthRecord key={index} record={record} />
              ))
            ) : (
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 30,
                  textAlign: "center",
                  fontFamily: "Poppins_800ExtraBold",
                }}
              >
                No Health Records Found.
              </Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dbdcde",
  },
  main: {
    flex: 1,
    padding: "10@s",
  },
  scrollViewContent: {
    paddingBottom: "20@s",
  },
  heading: {
    fontSize: "20@s",
    fontFamily: "Poppins_800ExtraBold",
    textAlign: "center",
    paddingVertical: "15@s",
  },
  input: {
    fontSize: "16@s",
    padding: "10@s",
    margin: "10@s",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: "4@s",
  },
});
