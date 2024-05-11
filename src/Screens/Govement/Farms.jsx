import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-gifted-charts";
import { Legend } from "../../Components/Containers/Legends";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

export const Farms = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const [farms, setFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/farms"
        );
        const chartData = response.data.map((farm, index) => ({
          value: farm.size || 0,
          label: `${index + 1}`,
        }));
        setFarms(chartData);
      } catch (error) {
        console.error(
          "Failed to fetch farms:",
          error.response ? error.response.data : error.message
        );
        alert(
          "Failed to fetch farms: " +
            (error.response ? error.response.data.message : error.message)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFarms();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        // contentContainerStyle={{ marginBottom: 100, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={true} // Ensure scroll indicators are visible
      >
        <Text style={styles.header}>The Size Of Farms</Text>
        <LineChart
          data={farms}
          isAnimated
          thickness={3}
          color="#07BAD1"
          width={width - 40}
          height={300}
          maxValue={250}
          noOfSections={5}
          animateOnDataChange
          animationDuration={1000}
          onDataChangeAnimationDuration={300}
          areaChart
          startFillColor="rgba(84,219,234,0.4)" // More subtle gradient
          endFillColor="rgba(84,219,234,0.1)"
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={50}
          backgroundColor="#414141"
          rulesColor="gray"
          rulesType="solid"
          initialSpacing={30}
          yAxisColor="lightgray"
          xAxisColor="lightgray"
          xAxisLabelText="Size (acres)"
          yAxisLabelText="Users"
          hideDataPoints={false}
          pointLabelYOffset={-10}
          pointLabelColor="#fff"
          dotColor="white"
          showVerticalLines={true}
          verticalLinesColor="rgba(255,255,255,0.5)"
        />
        <Legend />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 250,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
    fontFamily: "Poppins_800ExtraBold",
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  legendIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "white",
  },
});
