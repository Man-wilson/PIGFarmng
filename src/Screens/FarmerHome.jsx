import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ScaledSheet } from "react-native-size-matters";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SmallContainer } from "../Components/Containers/SmallContainer";
import { logoutUser } from "../Features/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tab;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const FarmerHome = ({ route }) => {
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [farm, setFarm] = useState();
  const [farmId, setFarmId] = useState(null);
  const [totalPigs, setTotalPigs] = useState(0);
  const [sickPigs, setSickPigs] = useState(0);
  const [boughtPigs, setBoughtPigs] = useState(0);
  const [deadPigs, setDeadPigs] = useState(0);
  const [marketReadyPigs, setMarketReadyPigs] = useState(0);
  const [newbornPigs, setNewbornPigs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const navigation = useNavigation();

  const unreadNotificationsCount = notifications.filter(
    (notif) => !notif.isRead
  ).length;
  const readNotificationsCount = notifications.filter(
    (notif) => notif.isRead
  ).length;

  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_800ExtraBold,
    Poppins_400Regular,
  });

  useEffect(() => {
    const getUser = async () => {
      const storedToken = await getItemAsync("token");
      const storedUserData = await getItemAsync("logindata");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      setToken(storedToken);
    };

    getUser();
  }, []);

  useEffect(() => {
    const getFarm = async () => {
      if (userData && token) {
        try {
          const response = await axios.get(
            `https://pig-farming-backend.onrender.com/api/farms/user/${userData.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data && response.data.length > 0) {
            setFarm(response.data[0]);
            setFarmId(response.data[0].id);
            // console.log(response.data[0].id, "Farm information");
          } else {
            console.log("No farm found for the user.");
          }
        } catch (error) {
          console.error(
            "Failed to get farm:",
            error.response ? error.response.data : error
          );
        }
      }
    };
    if (userData && token) {
      getFarm();
    }
  }, [userData, token]);

  //

  useEffect(() => {
    const fetchPigs = async () => {
      if (!farmId) {
        console.log("Farm ID not available. Waiting for farm data...");
        return;
      }

      try {
        const response = await axios.get(
          `https://pig-farming-backend.onrender.com/api/pigs/farm/${farmId}`
        );
        const pigs = response.data;

        setTotalPigs(pigs.length);
        setSickPigs(pigs.filter((pig) => pig.healthStatus === "Sick").length);
        setDeadPigs(pigs.filter((pig) => pig.healthStatus === "Dead").length);
        setMarketReadyPigs(
          pigs.filter(
            (pig) =>
              pig.healthStatus === "Good" ||
              (pig.healthStatus !== "Sick" && pig.healthStatus !== "Vaccinated")
          ).length
        );
        setNewbornPigs(
          pigs.filter(
            (pig) =>
              new Date(pig.birthDate) >=
              new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          ).length
        );
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
  }, [farmId]);

  useEffect(() => {
    if (route.params?.pigCreated) {
      // Fetch the latest pigs data
      fetchPigs();
    }
  }, [route.params?.pigCreated]);

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
  }, [token]);

  const markNotificationAsRead = async (notificationId) => {
    console.log(`Attempting to mark notification ${notificationId} as read`);
    try {
      const response = await axios.put(
        `https://pig-farming-backend.onrender.com/api/notifications/read/${notificationId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("Notification status updated:", response.data);

      // Update notifications and unread count atomically to ensure UI consistency
      setNotifications((prevNotifications) => {
        const updatedNotifications = prevNotifications.map((notif) =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        );

        // Update unread count based on new notifications state
        const unreadCount = updatedNotifications.filter(
          (n) => !n.isRead
        ).length;
        setUnreadNotifications(unreadCount);
        return updatedNotifications;
      });
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
    // console.log("Unread count", unreadCount);
    setUnreadNotifications(unreadCount);
  }, [notifications]);

  useEffect(() => {
    // console.log("Unread notifications count updated:", unreadNotifications);
  }, [unreadNotifications]);

  if (!userData) {
    return <Text>Loading user data...</Text>;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  if (!farm) {
    return (
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <View>
          {/* <Text
            style={{
              fontFamily: "Poppins_800ExtraBold",
              fontSize: 40,
              textAlign: "center",
              marginVertical: 10,
              color: "#28b266",
            }}
          >
            PIG FARMING
          </Text> */}
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 100,
            }}
            source={require("../../assets/Pig Farming APP ICON (1).png")}
          />
          <Text
            style={{
              fontFamily: "Poppins_800ExtraBold",
              fontSize: 20,
              textAlign: "center",
              marginVertical: 20,
              // color: "#28b266",
            }}
          >
            Please you don't have any farm data, first create a farm.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar style="black" backgroundColor="#28b266" />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.image}
              source={require("../../assets/PIG FARMING2 (1).png")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Ionicons
                style={{ paddingRight: 10 }}
                name="notifications-outline"
                size={24}
                color="#ffffff"
              />
              {unreadNotifications > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadNotifications}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Welcome back
            </Text>
            <FontAwesome6
              style={{ paddingLeft: 5 }}
              name="hands-clapping"
              size={24}
              color="yellow"
            />
          </View>
          <View style={styles.card}>
            <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 20 }}>
              {userData.firstName} {userData.lastName}
            </Text>
            <View style={styles.mainCard}>
              <View style={styles.insideCard}>
                <View style={styles.cardData}>
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 18,
                    }}
                  >
                    Farm: {farm.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_800ExtraBold",
                      fontSize: 18,
                    }}
                  >
                    size: {farm.size}
                  </Text>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontFamily: "Poppins_800ExtraBold",
                      color: "#29b366",
                    }}
                  >
                    {totalPigs.toString()}
                    <Text
                      style={{
                        fontFamily: "Poppins_800ExtraBold",
                        fontSize: 18,
                        color: "#000000",
                      }}
                    >
                      {""} PIGS
                    </Text>
                  </Text>
                </View>
                <View style={styles.cardData}>
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 17,
                    }}
                  >
                    farm ID
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_800ExtraBold",
                      fontSize: 12,
                    }}
                  >
                    {farm.id}
                  </Text>
                </View>
                <View style={styles.cardData}>
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 17,
                    }}
                  >
                    Contact:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_800ExtraBold",
                      fontSize: 12,
                    }}
                  >
                    {userData.phoneNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.insideContainer}>
            <Text
              style={{
                fontFamily: "Poppins_800ExtraBold",
                fontSize: 18,
                // fontWeight: "bold",
                color: "#28b265",
                textAlign: "center",
              }}
            >
              Farm Insights
            </Text>
          </View>
          <ScrollView>
            <SmallContainer
              imageSource={require("../../assets/3d.jpg")}
              title="Total Pigs"
              number={totalPigs.toString()}
            />
            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="Sick Pigs"
              number={sickPigs.toString()}
            />

            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="Dead Pigs"
              number={deadPigs.toString()}
            />
            <SmallContainer
              imageSource={require("../../assets/3d.jpg")}
              title="Pigs ready for Market"
              number={marketReadyPigs.toString()}
            />
            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="New born pigs"
              number={newbornPigs.toString()}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "0@s",
    padding: "0@s",
    backgroundColor: "#ffffff",
    height: height,
    width: width,
    // marginBottom: "10@s",
  },
  profileContainer: {
    flexDirection: "column",
    backgroundColor: "#28b265",
    paddingHorizontal: "10@s",
  },

  image: {
    width: "100@s",
    height: "50@s",
  },
  card: {
    paddingHorizontal: "0@s",
    paddingVertical: "10@s",
    color: "#ffffff",
  },
  badge: {
    position: "absolute",
    right: "-6@s",
    top: "-3@s",
    backgroundColor: "red",
    borderRadius: "10@s",
    width: "20@s",
    height: "20@s",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: "12@s",
    fontWeight: "bold",
  },
  mainCard: {
    borderRadius: "10@s",
    backgroundColor: "#ffffff",
    marginVertical: "10@s",
    flexDirection: "column",
    // ios shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    // Android Shadow
    elevation: 10,
    zIndex: 1,
  },
  insideCard: {
    padding: "10@s",
  },
  cardData: {
    color: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lowerContainer: {
    padding: "10@s",
    marginBottom: "80@s",
    flex: 1,
  },
  insideContainer: {
    flexDirection: "row",
    alignSelf: "center",
    // paddingVertical: "5@s",
  },
});
