import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import { Notification } from "../../Components/Containers/Notification";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getItemAsync } from "expo-secure-store";
import axios from "axios";

export const FarmerNotification = () => {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const navigation = useNavigation();
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedToken = await getItemAsync("token");
      if (!storedToken) {
        console.error("Authorization token is not available.");
        setIsLoading(false);
        return;
      }
      setToken(storedToken);

      try {
        const response = await axios.get(
          "https://pig-farming-backend.onrender.com/api/notifications",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        setNotifications(response.data);
        // Count unread notifications
        const unreadCount = response.data.filter((n) => !n.isRead).length;
        setUnreadNotifications(unreadCount);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error.response ? error.response.data : error.message
        );
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markNotificationAsRead = async (notificationId) => {
    console.log(`Attempting to mark notification ${notificationId} as read`);
    try {
      const response = await axios.put(
        `https://pig-farming-backend.onrender.com/api/notifications/read/${notificationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Notification status updated:", response.data);

      const updatedNotifications = notifications.map((notif) => {
        return notif.id === notificationId ? { ...notif, isRead: true } : notif;
      });
      setNotifications(updatedNotifications);

      // Directly update unread notifications count
      setUnreadNotifications((prevUnread) => prevUnread - 1);
    } catch (error) {
      console.error(
        "Failed to update notification status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    // console.log("Notifications updated", notifications);
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    console.log("Unread count", unreadCount);
    setUnreadNotifications(unreadCount);
  }, [notifications]); // Ensure updates to notifications update unread count

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading notifications...</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#f0f0f0" />
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <Ionicons name="notifications" size={24} color="black" />
        </View>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => markNotificationAsRead(item.id)}>
              <View style={styles.notificationItem}>
                <Notification
                  imageSource={require("../../../assets/3d.jpg")}
                  title={item.sender.username}
                  description={item.message}
                  number={`Pig ID: ${item.Pig.id}`}
                  isRead={item.isRead}
                />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.scrollViewContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
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
    fontSize: "20@s",
    color: "#000000",
    fontFamily: "Poppins_800ExtraBold",
  },
  scrollViewContent: {
    paddingBottom: "20@s",
  },
  scrollViewContent: {
    paddingBottom: "100@s",
  },
  notificationItem: {
    flexDirection: "row",
    padding: "10@s",
    borderBottomWidth: "1@s",
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  image: {
    width: "60@s",
    height: "60@s",
    borderRadius: "50@s",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: "10@s",
  },
  title: {
    fontSize: "18@s",
    fontWeight: "bold",
  },
  description: {
    fontSize: "14@s",
    color: "#888",
  },
  number: {
    fontSize: "14@s",
    fontWeight: "bold",
  },
  isRead: {
    fontStyle: "italic",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
