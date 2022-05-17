import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { placeHolder } from "../assets";
import ColoredText from "../components/ColoredText/ColoredText";
import TealButton from "../components/TealButton/TealButton";
import { colors } from "../utilities/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={[
          styles.flexContainer,
          {
            flex: 2,
            // backgroundColor: "tomato",
          },
        ]}
      >
        <Text style={styles.logo}>LOGO</Text>
      </View>
      <View
        style={[
          styles.flexContainer,
          { flex: 4, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image source={placeHolder} style={{ height: 250, width: 250 }} />

        <Text style={{ color: "white", fontSize: 20, marginTop: 25 }}>
          Text
        </Text>
      </View>
      <View
        style={[
          styles.flexContainer,
          {
            flex: 3,
            // backgroundColor: "gold",
          },
        ]}
      >
        <TealButton
          text="SIGNUP TODAY!"
          onPress={() => navigation.navigate("SignUp")}
        />
        <View style={styles.textContainer}>
          <ColoredText color="white" style={{ fontSize: 18 }}>
            Already have an account?
          </ColoredText>
          <ColoredText
            color={colors.teal100}
            underLine
            style={{ fontSize: 16 }}
            onPress={() => navigation.navigate("SignIn")}
          >
            Login
          </ColoredText>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  drawerSection: {
    marginTop: 15,
  },
  textContainer: {
    flexDirection: "row",
    // backgroundColor: "tomato",
    width: 280,
    justifyContent: "space-around",
    marginTop: 15,
  },
  logo: {
    fontSize: 48,
    color: "white",
  },
  flexContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
