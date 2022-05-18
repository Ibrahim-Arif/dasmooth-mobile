import React from "react";
import { LogBox, StyleSheet, View } from "react-native";
import { registerRootComponent } from "expo";
import { StackNavigaiton } from "./navigation/StackNavigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { colors } from "./utilities/colors";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.teal100,
  },
};
export default function App() {
  LogBox.ignoreAllLogs([
    "This can break usage such as persisting and restoring state.",
  ]);
  return (
    <PaperProvider theme={theme}>
      <StackNavigaiton />
    </PaperProvider>
  );
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
