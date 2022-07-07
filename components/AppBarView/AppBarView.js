import React from "react";
import { SafeAreaView, Platform, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

export default function AppBarView({ navigation, children }) {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar style={{ justifyContent: "space-between" }}>
        <Appbar.Action
          icon="menu"
          // {({ color, size }) => (
          //   <Octicons name="three-bars" size={size} color={color} />
          // )}
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title="LOGO" style={{ alignSelf: "center" }} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar>
      {children}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? 24 : 0,
  },
});
