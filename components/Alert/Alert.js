import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";

import { handleUpdateNotificationStatus } from "../../services";

export default function Alert({
  id,
  message = "Lorem",
  description = "Lorem Ipsum",
  type,
  style,
}) {
  const getColor = (type) => {
    switch (type) {
      case "success":
        return colors.successBg;

      case "danger":
        return colors.dangerBg;

      case "warning":
        return colors.warningBg;

      default:
        break;
    }
  };
  return (
    <View
      style={[
        {
          width: "100%",
          minHeight: 50,
          backgroundColor: getColor(type),
          borderWidth: 0.5,
          borderColor: colors.success,
          padding: 15,
          flexDirection: "row",
        },
        style,
      ]}
    >
      <AntDesign name="checkcircleo" size={24} color={colors.success} />
      <View style={{ marginLeft: 15, paddingRight: 25 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{message}</Text>
          <TouchableOpacity
            onPress={() => {
              handleUpdateNotificationStatus(id, true);
            }}
          >
            <AntDesign name="close" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10, textAlign: "left" }}>{description}</Text>
      </View>
    </View>
  );
}
