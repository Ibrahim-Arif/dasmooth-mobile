import React from "react";
import { StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { StackNavigaiton } from "./navigation/StackNavigation";

export default function App() {
  return <StackNavigaiton />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent("dasmooth-mobile", App);
