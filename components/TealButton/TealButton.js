import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../utilities/colors";

export default function TealButton({
  onPress,
  icon,
  text,
  style,
  disabled = false,
}) {
  return (
    <Button
      icon={icon}
      mode="contained"
      onPress={onPress}
      style={{
        // backgroundColor: colors.teal100,
        backgroundColor: disabled ? colors.grey100 : colors.teal100,
        // borderColor: colors.grey100,
        // borderWidth: 0.1,
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("screen").width * 0.9,
        height: 60,
        borderRadius: 5,
        ...style,
      }}
      disabled={disabled}
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
