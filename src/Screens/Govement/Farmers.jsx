import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export const Farmers = () => {
  const [users, setUsers] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const token = await getItemAsync("token");
        const response = await fetch(
          "https://pig-farming-backend.onrender.com/api/users/role/2",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Data fetched is not an array:", data);
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

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
      }
    };

    fetchFarms();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Users</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cellHeader}>Username</Text>
            <Text style={styles.cellHeader}>Email</Text>
            <Text style={styles.cellHeader}>ID</Text>
          </View>
          {users.map((user, index) => (
            <View key={user.id} style={styles.row}>
              <Text style={styles.cell}>{user.username}</Text>
              <Text style={styles.cell}>{user.email}</Text>
              <Text style={styles.cell}>{user.id}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.header}>Farms</Text>
        <View style={styles.table}>
          {farms.map((farm, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cellHeader}>Farm Label</Text>
              <Text style={styles.cellHeader}>Size</Text>
              <Text style={styles.cellHeader}>ID</Text>
              <Text style={styles.cell}>{farm.label}</Text>
              <Text style={styles.cell}>{farm.value}</Text>
              <Text style={styles.cell}>{index + 1}</Text>
            </View>
          ))}
        </View>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  table: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  cellHeader: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    backgroundColor: "#eee",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});
