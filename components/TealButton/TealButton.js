import React from "react";
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
        width: 250,
        height: 50,
        ...style,
      }}
      contentStyle={{ width: 250, height: 50, ...style }}
    >
      {text}
    </Button>
  );
}
