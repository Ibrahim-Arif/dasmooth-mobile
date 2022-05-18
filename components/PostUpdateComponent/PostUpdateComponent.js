import React, { useEffect } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import TealButton from "../TealButton/TealButton";

export default function PostUpdateComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
}) {
  const [text, setText] = React.useState("");
  useEffect(() => setText(selectedItem), []);
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TextInput
        label="Post an update"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ width: "100%" }}
        mode="outlined"
        multiline
      />
      <View style={{ marginTop: 15 }}>
        <TealButton
          text="POST UPDATE"
          onPress={() => {
            setSelectedItem(text);
            closeScreen();
          }}
        />
      </View>
    </View>
  );
}
