import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { getItem, getItemAsync } from "expo-secure-store";
import axios from "axios";

export const BackNotification = ({
  imageUrl,
  title,
  description,
  phoneNumber,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular,
  });

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    message: "",
    recipientId: "",
    pigId: "",
  });
  const [userData, setUserData] = useState();
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedToken = await getItemAsync("token");
        setToken(storedToken);

        if (!storedToken) {
          console.error("No token found, authorization required.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/users/role/3",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // console.log(users, "userzzzzzzzzzzzz");

  useEffect(() => {
    const getUser = async () => {
      const tokenStored = await getItemAsync("token");
      const userDataStored = await getItemAsync("logindata");

      if (userDataStored) {
        setUserData(JSON.parse(userDataStored));
      }
      setToken(tokenStored);
    };

    getUser();
  }, []);

  const sendNotification = async () => {
    if (!token) {
      console.error("Authorization token is not available.");
      return;
    }

    try {
      const response = await axios.post(
        "https://pig-farming-backend.onrender.com/api/notifications",
        {
          message: formData.message,
          recipientId: parseInt(formData.recipientId),
          pigId: parseInt(formData.pigId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Notification sent successfully:", response.data);
      setModalVisible(false);
    } catch (error) {
      console.error(
        "Failed to send notification:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // console.log(userData);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            My ID: {""} {description}
          </Text>
          <Text style={styles.number}>{phoneNumber}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleCallPress} style={styles.callButton}>
            <Text style={styles.callText}>Call Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.callButton}
          >
            <Text style={styles.callText}>reply</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, message: text })
              }
              value={formData.message}
              placeholder="Enter message"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) =>
                setFormData({ ...formData, recipientId: text })
              }
              value={formData.recipientId}
              placeholder="Enter recipient ID"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFormData({ ...formData, pigId: text })}
              value={formData.pigId}
              placeholder="Enter pig ID"
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendNotification}
            >
              <Text style={styles.sendButtonText}>Send Notification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    marginVertical: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  number: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },
  callButton: {
    backgroundColor: "#28b265",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  sendButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
