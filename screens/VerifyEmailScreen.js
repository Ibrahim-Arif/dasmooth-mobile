import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utilities/colors";
import { ColoredText } from "../components";
import { heights } from "../utilities/sizes";

export default function VerifyEmailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: heights.height20p,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "tomato",
          marginTop: 100,
        }}
      >
        <ColoredText color="white" fontSize={36}>
          Verify Email
        </ColoredText>
      </View>

      <View
        style={{
          height: heights.height20p,
          // alignItems: "center",
          justifyContent: "center",
          padding: 25,
        }}
      >
        <ColoredText color="white" style={{ marginTop: 15 }}>
          A verification email has been sent to your email, Kindly check you
          email.
        </ColoredText>
      </View>

      <View style={{ flexDirection: "row" }}>
        <ColoredText color="white" fontSize={16}>
          Verified your account?
        </ColoredText>
        <ColoredText
          color={colors.teal100}
          underLine={true}
          style={{ marginLeft: 5 }}
          fontSize={16}
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In
        </ColoredText>
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
    // justifyContent: "center",
  },

  logo: {
    fontSize: 36,
    color: "white",
  },
});
