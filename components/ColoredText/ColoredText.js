import React from "react";
import { Text } from "react-native";

export default function ColoredText({
  color,
  style,
  underLine = false,
  onPress = () => null,
  children,
}) {
  return (
    <Text
      style={{
        color: color,
        ...style,
        textDecorationLine: underLine ? "underline" : "none",
      }}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
