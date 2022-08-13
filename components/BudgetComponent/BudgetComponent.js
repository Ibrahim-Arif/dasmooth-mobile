import React, { useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { colors } from "../../utilities/colors";
import TealButton from "../TealButton/TealButton";

export default function BudgetComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
}) {
  const [text, setText] = React.useState("");
  useEffect(
    () => setText(selectedItem == "Set a budget" ? "0" : selectedItem),
    []
  );
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TextInput
        label="Set a budget"
        value={text != "N/A" ? text : 0}
        disabled={text == "N/A" ? true : false}
        onChangeText={(text) => setText(text)}
        style={{ width: "100%" }}
        mode="outlined"
        keyboardType="numeric"
      />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
      >
        {Platform.OS == "ios" ? (
          <Checkbox.IOS
            onPress={() => (text != "N/A" ? setText("N/A") : setText("0"))}
            status={text == "N/A" ? "checked" : "unchecked"}
            color={colors.teal100}
            uncheckedColor="#808080"
          />
        ) : (
          <Checkbox
            onPress={() => (text != "N/A" ? setText("N/A") : setText("0"))}
            status={text == "N/A" ? "checked" : "unchecked"}
            color={colors.teal100}
            uncheckedColor="#808080"
          />
        )}

        <Text>N/A</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <TealButton
          text="SET BUDGET"
          onPress={() => {
            if (text != "") setSelectedItem(text);
            closeScreen();
          }}
        />
      </View>
    </View>
  );
}
