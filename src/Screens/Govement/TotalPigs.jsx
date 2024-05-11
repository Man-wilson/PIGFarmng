import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import axios from "axios";

export const TotalPigs = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const Legend = ({ data }) => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.colorIndicator, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>{item.text}</Text>
          </View>
        ))}
      </View>
    );
  };

  const [pigsData, setPigsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPigs = async () => {
      try {
        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/pigs"
        );
        const pigs = response.data;

        // Count male and female pigs
        const maleCount = pigs.filter((pig) => pig.gender === "Male").length;
        const femaleCount = pigs.filter(
          (pig) => pig.gender === "Female"
        ).length;
        const total = pigs.length;

        const pieData = [
          {
            value: maleCount,
            color: "#4eb3d6",
            label: `Male - ${((maleCount / total) * 100).toFixed(2)}%`,
          },
          {
            value: femaleCount,
            color: "#d95d75",
            label: `Female - ${((femaleCount / total) * 100).toFixed(2)}%`,
          },
        ];

        setPigsData(pieData);
      } catch (error) {
        console.error(
          "Failed to fetch pigs:",
          error.response ? error.response.data : error.message
        );
        alert(
          "Failed to fetch pigs: " +
            (error.response ? error.response.data.message : error.message)
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPigs();
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.header}>Distribution of Pigs</Text>
        <PieChart
          data={pigsData}
          donut={true}
          showValuesAsLabels={false}
          showText={true}
          style={styles.chart}
        />
        <Legend
          data={pigsData.map((item) => ({ ...item, text: item.label }))}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#ffffff",
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 20,
  },
  header: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins_800ExtraBold",
  },
  chart: {
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 18,
    color: "black",
    fontFamily: "Poppins_800ExtraBold",
  },
});
