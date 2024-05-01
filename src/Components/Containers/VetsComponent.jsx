import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

export const VetsComponent = ({
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={imageUrl} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.number}>{phoneNumber}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleCallPress} style={styles.callButton}>
            <Text style={styles.callText}>Call Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callText}>Notify Me</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    color: "#888888",
    paddingVertical: 5,
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
    alignSelf: "bottom",
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
