import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tab, isFocused ? styles.tabFocused : null]}
          >
            <Text style={{ color: isFocused ? "#0E5A64" : "#ffffff" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: "black", // Background color for the entire tab bar
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5, // Margin between tabs
    borderRadius: 20, // Border radius for each tab
  },
  tabFocused: {
    borderBottomWidth: 4,
    borderBottomColor: "#0E5A64",
  },
});
