import react from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";

export const Legend = () => (
  <View style={styles.legendContainer}>
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, { backgroundColor: "#07BAD1" }]} />
      <Text style={styles.legendText}>Small (0-100 acres)</Text>
    </View>
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, { backgroundColor: "#2196F3" }]} />
      <Text style={styles.legendText}>Medium (101-200 acres)</Text>
    </View>
    <View style={styles.legendItem}>
      <View style={[styles.legendIcon, { backgroundColor: "#3F51B5" }]} />
      <Text style={styles.legendText}>Large (201+ acres)</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  legendContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  legendIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#000000",
  },
});
