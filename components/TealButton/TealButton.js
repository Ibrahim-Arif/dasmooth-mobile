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
      style={[
        {
          // backgroundColor: colors.teal100,
          backgroundColor: disabled ? colors.disabled : colors.mosque,
          borderColor: colors.gray40,
          borderWidth: disabled ? 1 : 0,
          alignItems: "center",
          justifyContent: "center",
          width: Dimensions.get("screen").width * 0.9,
          height: 60,
          borderRadius: 5,
          color: colors.white,
          ...style,
        },
        !disabled && {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 5,
        },
      ]}
      labelStyle={{
        color: colors.white,
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
