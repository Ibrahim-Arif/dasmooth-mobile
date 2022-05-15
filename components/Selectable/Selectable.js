import React, { Children } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../utilities/colors";

export default function Selectable({
  bgColor = null,
  onPress = () => null,
  icon = null,

  isActive = false,
  children,
}) {
  return (
    <Button
      style={{
        width: "100%",
        height: 60,
        backgroundColor: isActive || !bgColor ? colors.teal100 : bgColor,
        color: isActive ? "white" : "black",
        justifyContent: "flex-start",
        marginVertical: 5,
      }}
      contentStyle={{ width: "100%", height: 60, justifyContent: "flex-start" }}
      onPress={onPress}
      icon={() => icon}
    >
      {children}
    </Button>
  );
}
