import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import ColoredText from "../components/ColoredText/ColoredText";

import TealButton from "../components/TealButton/TealButton";
import { colors } from "../utilities/colors";

export default function SignUpScreen({ navigation }) {
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
            },
          ]}
        >
          <Text style={styles.logo}>LOGO</Text>
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
            text="SignUp"
            onPress={() => navigation.navigate("Main")}
          />
          <View style={styles.textContainer}>
            <ColoredText color="white" style={{ fontSize: 16 }}>
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
    fontSize: 48,
    color: "white",
  },
  welcomeBackText: { fontSize: 26, color: "white" },
  flexContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
