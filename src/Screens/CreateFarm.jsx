import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTextField } from "../Components/TextFields/AddTextField";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import { Button } from "../Components/Buttons/Button";
import { MaterialIcons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { RoundedButton } from "../Components/Buttons/RoundedButton";
import { getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const CreateFarm = () => {
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_800ExtraBold });
  const [token, setToken] = useState();
  const [userData, setUserData] = useState();
  const [data, setData] = useState({
    name: "",
    size: "",
    owner: "",
    phone: "",
    province: "",
    district: "",
    sector: "",
    zipCode: "",
    locationId: null,
    userId: null,
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (userData)
      setData({
        ...data,
        locationId: userData.locationId,
        userId: userData.id,
      });
  }, [userData]);

  console.log(data, "farmmmmmmmmm");

  useEffect(() => {
    const getUser = async () => {
      let token = await getItemAsync("token");
      let user = await getItemAsync("logindata");
      setToken(token);
      setUserData(JSON.parse(user));
    };

    getUser();
  }, []);

  if (!fontsLoaded || !token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const createFarmer = async () => {
    try {
      const response = await axios.post(
        "https://pig-farming-backend.onrender.com/api/farms",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        response.data,
        "Responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      );
      if (response.status === 201) {
        navigation.popToTop();

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'FarmerHome' }],
        // });
      }
    } catch (error) {
      console.error(
        "Failed to create farm:",
        error.response ? error.response.data : error
      );
    }
  };

  // console.log(userData);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/PIG FARMING Icon2 (1).png")}
        style={styles.backgroundImage}
      >
        <View>
          <Text style={styles.Title}>Create a farm</Text>
        </View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Farm name"}
                value={data.name}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    name: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Size of the farm"}
                value={data.size}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    size: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Owner of the Farm"}
                value={data.owner}
                onChangeText={(text) => setData({ ...data, owner: text })}
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Phone"}
                value={data.phone}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    phone: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Province"}
                value={data.province}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    province: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"District"}
                value={data.district}
                onChangeText={(text) =>
                  setData({
                    ...data,
                    district: text,
                  })
                }
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Sector"}
                value={data.sector}
                onChangeText={(text) => setData({ ...data, sector: text })}
              />
            </View>
            <View style={styles.textInputs}>
              <AddTextField
                placeholder={"Zip Code"}
                value={data.zipCode}
                onChangeText={(text) => setData({ ...data, zipCode: text })}
              />
            </View>
            <RoundedButton text={"register a farm"} action={createFarmer} />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  Container: {
    margin: "0@s",
    padding: "0@s",
    height: height,
    width: width,
    marginBottom: "10@s",
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  Title: {
    fontFamily: "Poppins_800ExtraBold",
    fontSize: "25@s",
    marginVertical: "10@s",
    alignSelf: "center",
  },
  textInputs: {
    marginVertical: "5@s",
  },
});
