import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import { Notification } from "../../Components/Containers/Notification";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export const Notifications = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#dbdcde" />
      <View style={styles.main}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={24} color="black" />
          <Text style={styles.headerTitle}>Notifications</Text>
          <Ionicons name="notifications" size={24} color="black" />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
          <Notification
            imageSource={require("../../../assets/3d.jpg")}
            title="Green Pig farming Ltd"
            description="Gasabo-Kimironko"
            number="+250785161514"
          />
        </ScrollView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20@s",
    paddingHorizontal: "10@s",
  },
  headerTitle: {
    fontSize: "18@s",
  },
  scrollViewContent: {
    paddingBottom: "20@s",
  },
});
