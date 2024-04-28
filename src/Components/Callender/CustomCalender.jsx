import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CustomCalendar = () => {
  // Using state to hold the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Function to calculate the milliseconds until the next midnight
    const msUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      return midnight.getTime() - now.getTime();
    };

    // Function to update the date at midnight
    const updateDateAtMidnight = () => {
      setTimeout(() => {
        setCurrentDate(new Date()); // Update the current date
        updateDateAtMidnight(); // Recursively set the next update
      }, msUntilMidnight());
    };

    // Set the initial timeout
    updateDateAtMidnight();

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(updateDateAtMidnight);
  }, []);

  // Determine the start of the current week
  const startOfWeek = currentDate.getDate() - currentDate.getDay();
  const datesOfWeek = daysOfWeek.map((day, index) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      startOfWeek + index
    );
    return {
      dayName: day,
      dateNumber: date.getDate(),
      isToday: date.toDateString() === currentDate.toDateString(),
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {currentDate.toLocaleString("default", { month: "long" })}{" "}
        {currentDate.getFullYear()}
      </Text>
      <View style={styles.weekRow}>
        {datesOfWeek.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dateContainer,
              item.isToday ? styles.selectedDay : styles.normalDay,
            ]}
          >
            <Text
              style={[
                styles.day,
                item.isToday ? styles.selectedText : styles.normalText,
              ]}
            >
              {item.dayName}
            </Text>
            <Text
              style={[
                styles.date,
                item.isToday ? styles.selectedText : styles.normalText,
              ]}
            >
              {item.dateNumber}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#f0f0f0",
  },
  dateContainer: {
    alignItems: "center",
    padding: 10,
    width: "12.28%", // Divide by 7 to get equal width for each day
    marginHorizontal: 3, // Add space between day containers
    borderRadius: 10, // Round the corners of the day containers
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjusted for spacing between day containers
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingVertical: 5, // Padding top and bottom inside the week row container
  },
  selectedDay: {
    backgroundColor: "green",
  },
  normalDay: {
    backgroundColor: "lightgray",
  },
  day: {
    fontSize: 12,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
  normalText: {
    color: "#000",
  },
});
