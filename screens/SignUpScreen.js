import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { Formik } from "formik";
import * as yup from "yup";

import { ColoredText, TealButton } from "../components";
import { logo } from "../assets";
import { colors } from "../utilities/colors";
import { heights, widths } from "../utilities/sizes";
import { handleSignUp } from "../services";

export default function SignUpScreen({ navigation }) {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
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

  let schema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    password: yup.string().required().min(6).label("Password"),
  });

  const handleSignUpClick = (email, password) => {
    setLoading(true);
    handleSignUp(email, password, false)
      .then((user) => {
        setLoading(false);
        navigation.navigate("VerifyEmail");
      })
      .catch((ex) => {
        toast.show("Error signing up", {
          type: "danger",
          style: { height: 50 },
        });
        setLoading(false);
      });
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
            },
          ]}
        >
          <Text style={styles.welcomeBackText}>Welcome Back</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) =>
            handleSignUpClick(values.email, values.password)
          }
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.formContainer}>
              <TextInput
                label="Email"
                style={styles.textInput}
                theme={inputTheme}
                onBlur={() => setIsFieldActive(false)}
                onFocus={() => setIsFieldActive(true)}
                value={values.email}
                onChangeText={handleChange("email")}
              />

              <Text style={{ color: colors.danger }} visible={errors.email}>
                {errors.email}
              </Text>

              <TextInput
                label="Password"
                secureTextEntry
                style={styles.textInput}
                theme={inputTheme}
                onBlur={() => setIsFieldActive(false)}
                onFocus={() => setIsFieldActive(true)}
                value={values.password}
                onChangeText={handleChange("password")}
              />
              <Text style={{ color: colors.danger }} visible={errors.password}>
                {errors.password}
              </Text>

              {loading ? (
                <ActivityIndicator />
              ) : (
                <TealButton text="SignUp" onPress={handleSubmit} />
              )}

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
          )}
        </Formik>
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
  formContainer: {
    height: 350,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
  },
  textInput: { height: 60, width: 300 },
});
