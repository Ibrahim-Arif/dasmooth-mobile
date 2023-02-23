import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Checkbox } from "react-native-paper";
import { colors } from "../../utilities/colors";
import TealButton from "../TealButton/TealButton";

export default function BudgetComponent({
  itemSelected,
  setItemSelected,
  closeScreen,
}) {
  const [text, setText] = useState("");
  useEffect(() => (itemSelected ? setText(itemSelected) : null), []);

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
        <Checkbox.Android
          onPress={() => (text != "N/A" ? setText("N/A") : setText("0"))}
          status={text == "N/A" ? "checked" : "unchecked"}
          color={colors.teal100}
          uncheckedColor="#808080"
        />

        <Text>N/A</Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <TealButton
          text="SET BUDGET"
          onPress={() => {
            if (text != "") setItemSelected(text);
            closeScreen();
          }}
        />
      </View>
    </View>
  );
}
