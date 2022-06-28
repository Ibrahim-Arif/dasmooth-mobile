import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from "react-native";

import { logo, placeHolder, testImage } from "../assets";
import { ColoredText, TealButton } from "../components";
import { colors } from "../utilities/colors";
import { heights, widths } from "../utilities/sizes";
import Interpolator from "../utilities/Interpolator";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useUser } from "../hooks/useContext";

export default function WelcomeScreen({ navigation }) {
  const auth = getAuth();
  const fontSizeInterpolator = Interpolator.getInterpolator({
    input: [4, 5, 6, 7, 8, 10, 11, 13, 40],
    output: [45, 45, 32, 28, 28, 22, 19, 15, 10],
  });
  // const text =
  // "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const text = "text";
  const { setIsLogin } = useUser();

  onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
      setIsLogin(user);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={[
          styles.flexContainer,
          {
            flex: 2,
            marginTop: 10,
          },
        ]}
      >
        <Image
          source={logo}
          style={{
            height: heights.height10p,
            width: widths.width60p,
          }}
        />
      </View>
      <View
        style={[
          styles.flexContainer,
          { flex: 4, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Image
          source={testImage}
          style={{
            height: heights.height30p,
            width: widths.width65p,
          }}
        />

        <Text
          style={{
            color: "white",
            fontSize: fontSizeInterpolator(text.length),
            textAlign: "justify",
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          {text}
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
    marginTop: Platform.OS == "android" ? 25 : 0,
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
