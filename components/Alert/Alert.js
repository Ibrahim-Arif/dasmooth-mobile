import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { handleUpdateNotificationStatus } from "../../services";
import { batonsList } from "../../utilities/batonsList";
import { Button } from "react-native-paper";

export default function Alert({
  batonTitle = "Baton Title",
  batonName = "Baton Name",
  batonDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper quis lectus nulla at. Metus aliquam eleifend mi in nulla. Erat velit scelerisque in dictum. Sagittis vitae et leo duis ut diam.",
  batonType = "pending",
  onClose = () => {},
  onViewDetails = () => {},
  style,
}) {
  const { bgColor, borderColor } = batonsList[batonType];
  const [buttonFocused, setButtonFocused] = React.useState(false);

  const getNotificationIcon = () => {
    switch (batonType) {
      case "received":
        return <AntDesign name="infocirlce" size={16} color="white" />;
      case "complete":
        return <Ionicons name="checkbox" size={16} color="white" />;
      case "declined":
        return <Ionicons name="ios-close-circle" size={18} color="white" />;
      case "accepted":
        return <MaterialIcons name="exit-to-app" size={18} color="white" />;
      default:
        return <AntDesign name="infocirlce" size={16} color="white" />;
    }
  };
  return (
    <View
      style={[
        {
          width: "100%",
          minHeight: 50,
          backgroundColor: bgColor,
          borderWidth: 0.5,
          borderColor: borderColor,
          padding: 10,
          paddingRight: 10,
          paddingLeft: 16,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 26,
              width: 26,
              borderRadius: 13,
              backgroundColor: borderColor,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {getNotificationIcon()}
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginLeft: 8 }}>
            {batonTitle}
          </Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="close" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 4, textAlign: "left", fontSize: 20 }}>
        {batonName}
      </Text>
      <Text style={{ marginTop: 4, textAlign: "left", fontSize: 14 }}>
        {batonDescription}
      </Text>
      <Pressable
        style={{
          backgroundColor: buttonFocused ? borderColor : colors.white,
          borderWidth: 1,
          borderColor: borderColor,
          borderRadius: 4,
          marginTop: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          paddingVertical: 4,
          paddingHorizontal: 8,
          alignSelf: "flex-start",
        }}
        onPressIn={() => setButtonFocused(true)}
        onPressOut={() => setButtonFocused(false)}
        onPress={onViewDetails}
      >
        <Text
          style={{
            color: buttonFocused ? colors.white : "#000",
            fontSize: 14,
          }}
        >
          View Details
        </Text>
      </Pressable>
    </View>
  );
}
