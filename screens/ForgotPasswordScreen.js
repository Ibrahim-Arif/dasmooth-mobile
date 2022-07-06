import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import { logo } from "../assets";

import { ColoredText, TealButton } from "../components";
import { handleForgotPassword } from "../services";
import { colors } from "../utilities/colors";

import { heights, widths } from "../utilities/sizes";
import { useToast } from "react-native-toast-notifications";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isFieldActive, setIsFieldActive] = useState(false);
  const toast = useToast();

  let inputTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.teal100,
      text: isFieldActive ? "black" : "white",
      background: isFieldActive ? "white" : "transparent",
      placeholder: isFieldActive ? "black" : "white",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.flexContainer,
            {
              height: 150,
              // backgroundColor: "tomato",
              marginTop: 30,
            },
          ]}
        >
          <Image
            source={logo}
            style={{ height: heights.height10p, width: widths.width60p }}
          />
        </View>
        <View
          style={[
            styles.flexContainer,
            {
              height: 50,
              // backgroundColor: "tomato",
            },
          ]}
        >
          <Text style={styles.welcomeBackText}>Forgot Password</Text>
        </View>
        <View
          style={[
            // styles.flexContainer,
            {
              height: 350, // backgroundColor: "tomato",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 50,
            },
          ]}
        >
          <TextInput
            label="Email"
            style={[{ height: 60, width: 300 }]}
            theme={inputTheme}
            onBlur={() => setIsFieldActive(false)}
            onFocus={() => setIsFieldActive(true)}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <TealButton
            text="Reset Password"
            onPress={() => {
              handleForgotPassword(email)
                .then(() => {
                  toast.show(
                    "An email has been sent to you with a link to \nreset your password.",
                    {
                      type: "success",
                    }
                  );
                  navigation.navigate("SignIn");
                })
                .catch((ex) => {
                  console.log(ex);
                  toast.show("Something went wrong. Please try again.", {
                    type: "danger",
                  });
                });
            }}
          />

          <View style={styles.textContainer}>
            <ColoredText
              color={colors.teal100}
              underLine
              style={{ fontSize: 16 }}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </ColoredText>
          </View>
        </View>
      </ScrollView>
    </View>
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
    width: 250,
    justifyContent: "space-around",
    marginTop: 15,
  },
  logo: {
    // marginTop: 50,
  },
  welcomeBackText: { fontSize: 26, color: "white" },
  flexContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    // backgroundColor: "tomato",
    width: 250,
    justifyContent: "space-around",
    marginTop: 15,
  },
});
