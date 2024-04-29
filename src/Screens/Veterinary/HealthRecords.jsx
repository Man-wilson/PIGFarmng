import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { HealthRecord } from "../../Components/Containers/HealthRecord";

export const HealthRecords = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="black" backgroundColor="#ffffff" />
      <View style={styles.main}>
        <HealthRecord
          record={{
            date: "2024-04-29",
            description: "Routine check-up",
            treatment: "Vaccination",
            pigId: 102,
          }}
        />
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
});
