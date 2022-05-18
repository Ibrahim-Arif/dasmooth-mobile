import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../utilities/colors";

export default function TealButton({ onPress, icon, text, style }) {
  return (
    <Button
      icon={icon}
      mode="contained"
      onPress={onPress}
      style={{
        backgroundColor: colors.teal100,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("screen").width * 0.9,
        height: 60,
        borderRadius: 5,
        ...style,
      }}
      contentStyle={{
        width: Dimensions.get("screen").width * 0.9,
        height: 60,
        borderRadius: 5,
        ...style,
      }}
    >
      {text}
    </Button>
  );
}
