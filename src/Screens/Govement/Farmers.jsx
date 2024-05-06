import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import axios from "axios";

export const Farmers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersByRoleId = async () => {
      try {
        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/users/role/2"
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersByRoleId();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Users with Role ID 2</Text>
      {users.map((user) => (
        <View key={user.id} style={styles.userContainer}>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>
            Name: {user.firstName} {user.lastName}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // Adjust the background color as needed
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light grey background for each user
    borderRadius: 5,
  },
});
