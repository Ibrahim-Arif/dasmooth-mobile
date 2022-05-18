import React, { useEffect } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
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
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ width: "100%" }}
        mode="outlined"
        keyboardType="numeric"
      />
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
