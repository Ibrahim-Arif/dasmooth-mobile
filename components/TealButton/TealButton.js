import React from "react";
import {
  Dimensions,
  Pressable,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
// import { Button } from "react-native-paper";
import { colors } from "../../utilities/colors";

export default function TealButton({
  onPress,
  icon,
  text,
  style,
  disabled = false,
}) {
  const [pressed, setPressed] = React.useState(false);

  const backgroundColor = React.useMemo(() => {
    let bgColor = null;
    if (disabled) {
      bgColor = colors.disabled;
    } else {
      bgColor = colors.mosque;
    }
    return bgColor;
  }, [disabled, pressed]);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={colors.eden}
      mode="contained"
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        {
          // backgroundColor: colors.teal100,
          backgroundColor: backgroundColor,
          borderColor: colors.gray40,
          borderWidth: disabled ? 1 : 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
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
        {
          width: Dimensions.get("screen").width * 0.9,
          height: 60,
          borderRadius: 5,
        },
        style,
      ]}
      disabled={disabled}
    >
      <>
        {icon && <View style={{ marginRight: 15 }}>{icon()}</View>}
        <Text
          style={{
            color: colors.white,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {text?.toUpperCase()}
        </Text>
      </>
    </TouchableHighlight>
  );
}
