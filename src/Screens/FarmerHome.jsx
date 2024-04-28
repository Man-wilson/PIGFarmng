import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  Button,
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

const Tab = createMaterialTopTabNavigator();
const { Navigator, Screen } = Tab;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const FarmerHome = ({ route }) => {
  // const [token, setToken] = useState();
  // const [userData, setUserData] = useState();
  // const [farm, setFarm] = useState();

  // useEffect(() => {
  //   const getUser = async () => {
  //     let token = await getItemAsync("token");
  //     let user = await getItemAsync("logindata");
  //     setToken(token);
  //     setUserData(JSON.parse(user));
  //   };

  //   getUser();
  // }, []);

  // let [fontsLoaded] = useFonts({
  //   Poppins_500Medium,
  //   Poppins_800ExtraBold,
  //   Poppins_400Regular,
  // });

  // if (!farm) {
  //   return <Text>No farm data available, first create a farm</Text>;
  // }

  // if (!fontsLoaded) {
  //   return null;
  // }
  // console.log(userData, "cccccccccccccccccccccccccccccccccccccccccccccccv");
  // const getFarm = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://pig-farming-backend.onrender.com/api/farms/user/${userData.id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data, "datatatatatatata");
  //     setFarm(response.data);
  //   } catch (error) {
  //     console.error(
  //       "Failed to get farm:",
  //       error.response ? error.response.data : error
  //     );
  //   }

  //   useEffect(() => {
  //     if (userData) {
  //       getFarm();
  //     }
  //   }, [userData]);
  // };

  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [farm, setFarm] = useState();

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

  // useEffect(() => {
  //   const getFarm = async () => {
  //     if (userData && token) {
  //       try {
  //         const response = await axios.get(
  //           `https://pig-farming-backend.onrender.com/api/farms/user/${userData.id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //         setFarm(response.data);
  //         console.log(
  //           response.data,
  //           "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  //         );
  //       } catch (error) {
  //         console.error(
  //           "Failed to get farm:",
  //           error.response ? error.response.data : error
  //         );
  //       }
  //     }
  //   };

  //   getFarm();
  // }, [userData, token]);

  // console.log(userData, "+++++++++++++++++++++++++++++++");

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
            console.log(response.data[0], "Farm information");
          } else {
            console.log("No farms found for the user.");
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

  if (!userData) {
    return <Text>Loading user data...</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }

  if (!farm) {
    return <Text>No farm data available, please create a farm first.</Text>;
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
            <Ionicons
              style={{ paddingRight: 10 }}
              name="notifications-outline"
              size={24}
              color="#ffffff"
            />
          </View>
          <View style={{ flexDirection: "row", paddingLeft: 10 }}>
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
                    500
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
                    Location
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins_800ExtraBold",
                      fontSize: 12,
                    }}
                  >
                    Kimironko
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
            {/* <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Today
            </Text> */}
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
            {/* <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Updates
            </Text> */}
          </View>
          <ScrollView>
            <SmallContainer
              imageSource={require("../../assets/3d.jpg")}
              title="Total Pigs"
              number="50"
            />
            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="Sick Pigs"
              number="50"
            />
            <SmallContainer
              imageSource={require("../../assets/3d.jpg")}
              title="Pigs Bought"
              number="50"
            />
            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="Dead Pigs"
              number="50"
            />
            <SmallContainer
              imageSource={require("../../assets/3d.jpg")}
              title="Pigs ready for Market"
              number="50"
            />
            <SmallContainer
              imageSource={require("../../assets/pigs.png")}
              title="New born pigs"
              number="50"
            />
          </ScrollView>
        </View>
        {/* <View style={{ height: "100%" }}>
          <Navigator
            screenOptions={{
              headerShown: false,
              alignSelf: "center",
              tabBarActiveTintColor: "#0E5A64",
              tabBarInactiveTintColor: "#ADADAD",
              tabBarIndicatorStyle: {
                backgroundColor: "#0E5A64",
                width: 30,
                height: 4,
                borderRadius: 5,
                marginHorizontal: 81,
                marginBottom: 6,
              },
              tabBarStyle: {
                backgroundColor: "#F2F1F1",
                borderBottomWidth: 1,
                borderColor: "black",
              },
            }}
          >
            <Screen name="Home" component={FarmerHome} />
          </Navigator>
        </View> */}
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
  },

  image: {
    width: "100@s",
    height: "50@s",
  },
  card: {
    paddingHorizontal: "10@s",
    paddingVertical: "10@s",
    color: "#ffffff",
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
