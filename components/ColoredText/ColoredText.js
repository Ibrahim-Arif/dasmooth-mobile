import React from "react";
import { Text } from "react-native";

export default function ColoredText({
  color,
  style,
  underLine = false,
  fontSize = 18,
  onPress = () => null,
  visible = true,
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
      visible={visible}
    >
      {children}
    </Text>
  );
}
