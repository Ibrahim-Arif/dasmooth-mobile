import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../utilities/colors";

export default function NotificationBox({ text }) {
  return (
    <View
      style={{
        backgroundColor: colors.cgLight80,
        color: "black",
        borderRadius: 15,
        padding: 30,
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={{ color: colors.dashboardText, fontSize: 16 }}>{text}</Text>
    </View>
  );
}
