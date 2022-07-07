import React from "react";
import { Text } from "react-native";

export default function ColoredText({
  color,
  style,
  underLine = false,
  fontSize = 18,
  onPress = () => null,
  children,
}) {
  return (
    <Text
      style={{
        color: color,
        fontSize: fontSize,
        ...style,
        textDecorationLine: underLine ? "underline" : "none",
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
