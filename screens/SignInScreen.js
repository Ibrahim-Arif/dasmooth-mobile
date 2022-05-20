import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import { logo } from "../assets";

import { ColoredText, TealButton } from "../components";
import { colors } from "../utilities/colors";
import { heights, widths } from "../utilities/sizes";

export default function SignInScreen({ navigation }) {
  const [text, setText] = React.useState("");
  const [isFieldActive, setIsFieldActive] = React.useState(false);

  let inputTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.teal100,
      // accent: "#f1c40f",
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
          <Text style={styles.welcomeBackText}>Welcome Back</Text>
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
            // right={<TextInput.Icon name="email" />}
            style={[{ height: 60, width: 300 }]}
            theme={inputTheme}
            onBlur={() => setIsFieldActive(false)}
            onFocus={() => setIsFieldActive(true)}
          />
          <TextInput
            label="Password"
            secureTextEntry
            // right={<TextInput.Icon name="eye" />}
            style={{ height: 60, width: 300 }}
            theme={inputTheme}
            onBlur={() => setIsFieldActive(false)}
            onFocus={() => setIsFieldActive(true)}
          />
          <TealButton
            text="Login"
            onPress={() => navigation.navigate("Main")}
          />
          <ColoredText
            color={colors.teal100}
            underLine
            style={{ fontSize: 16 }}
            onPress={() => null}
          >
            Forgot your password?
          </ColoredText>
          <View style={styles.textContainer}>
            <ColoredText color="white" style={{ fontSize: 16 }}>
              Don't have an account?
            </ColoredText>
            <ColoredText
              color={colors.teal100}
              underLine
              style={{ fontSize: 16 }}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign Up
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
