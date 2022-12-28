import React from "react";
import { Avatar, Button } from "react-native-paper";
import { colors } from "../../utilities/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet, TouchableNativeFeedback } from "react-native";

export default function Selectable({
  bgColor = null,
  onPress,
  icon = null,
  text = null,
  isActive = false,
  batonType = null,
  isEditable = false,
  textColor = null,
  style,
  labelStyle,
  disabled = false,
  iconBgColor = null,
  iconColor = null,
  children,
}) {
  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            width: "100%",
            height: 60,
            backgroundColor: disabled
              ? colors.lightShade
              : isActive
              ? colors.mosque
              : !bgColor
              ? colors.azure
              : bgColor,
            color: disabled ? "black" : isActive ? "white" : "black",
            justifyContent: "flex-start",
            marginVertical: 5,
            borderColor: disabled ? "black" : colors.mosque,
            borderWidth: 1,
            borderRadius: 5,
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
      >
        {icon ? (
          <Avatar.Icon
            icon={icon}
            size={40}
            color={disabled ? "black" : iconColor ? iconColor : colors.white}
            style={{
              backgroundColor: disabled
                ? "transparent"
                : iconBgColor
                ? iconBgColor
                : colors.mosque,
            }}
          />
        ) : (
          text && (
            <Avatar.Text
              label={text}
              icon={icon}
              size={40}
              color={disabled ? "black" : colors.white}
              style={{
                backgroundColor: disabled ? "transparent" : colors.mosque,
              }}
            />
          )
        )}

        <Text
          style={{
            color: disabled
              ? "black"
              : textColor
              ? textColor
              : isActive
              ? colors.white
              : colors.mosque,
            fontSize: 16,
            fontWeight: "400",
            marginLeft: 15,
            flexShrink: 1,
            width: "70%",
            ...labelStyle,
          }}
        >
          {children}
        </Text>
        {isEditable && (
          <Ionicons
            name="pencil"
            size={16}
            color={colors.white}
            style={styles.pencilIcon}
          />
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  pencilIcon: {
    position: "absolute",
    right: 25,
  },
});

{
  /* <Button
  disabled={disabled}
  style={[
    {
      width: "100%",
      height: 60,
      backgroundColor: isActive
        ? colors.mosque
        : !bgColor
        ? colors.azure
        : bgColor,
      color: isActive ? "white" : "black",
      justifyContent: "flex-start",
      marginVertical: 5,
      borderColor: colors.mosque,
      borderWidth: 1,
      borderRadius: 5,
      ...style,
    },
    {
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
  contentStyle={{
    width: "100%",
    height: 60,
    justifyContent: "flex-start",
    // backgroundColor: "gold",
    ...contentStyle,
  }}
  labelStyle={{
    color: textColor
      ? textColor
      : isActive
      ? colors.white
      : colors.mosque,
    // backgroundColor: "red",
    // flex: 1,
    ...labelStyle,
  }}
  onPress={onPress}
  icon={() => icon}
>
  {children}
  <>
    {"     "}
    <Ionicons name="pencil" size={16} color={colors.white} />
  </>
</Button> */
}
