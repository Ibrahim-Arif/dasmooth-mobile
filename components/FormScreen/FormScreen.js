import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { IconButton } from "react-native-paper";

export default function FormScreen({
  title,

  navigation,
  children,
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <IconButton
          icon="close"
          onPress={() => navigation.goBack()}
          size={20}
        />
        <Text style={{ fontSize: 18 }}>{title}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Platform.OS === "android" ? 24 : 0 },
  topView: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 25,
  },
});
