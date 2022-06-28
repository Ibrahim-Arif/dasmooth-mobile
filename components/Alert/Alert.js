import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";

export default function Alert({
  message = "Lorem",
  description = "Lorem Ipsum",
  type,
}) {
  const getColor = (type) => {
    switch (type) {
      case "success":
        return colors.successBg;
        break;
      case "danger":
        return colors.dangerBg;
        break;
      case "warning":
        return colors.warningBg;
        break;
      default:
        break;
    }
  };
  return (
    <View
      style={{
        width: "100%",
        minHeight: 50,
        backgroundColor: getColor(type),
        borderWidth: 0.5,
        borderColor: colors.success,
        padding: 15,
        flexDirection: "row",
      }}
    >
      <AntDesign name="checkcircleo" size={24} color={colors.success} />
      <View style={{ marginLeft: 15, paddingRight: 25 }}>
        <Text>{message}</Text>
        <Text style={{ marginTop: 10, textAlign: "left" }}>{description}</Text>
      </View>
    </View>
  );
}
