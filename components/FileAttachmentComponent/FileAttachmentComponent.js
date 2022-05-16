import React, { useState } from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ColoredText from "../ColoredText/ColoredText";
import TealButton from "../TealButton/TealButton";
import Selectable from "../Selectable/Selectable";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";

export default function FileAttachmentComponent({
  selectedItem,
  setSelectedItem,
  closeModal,
}) {
  const [files, setFiles] = useState(selectedItem);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    console.log(result);
    const items = [...files];
    if (!result.cancelled) {
      let fileName = "";
      fileName = result.uri.split("/").slice(-1)[0];
      result.fileName = fileName;
      items.push(result);
      setFiles(items);
      console.log(items);
    }
  };
  const handleRemoveFile = (index) => {
    let temp = files;
    delete temp[index];

    setFiles(temp.filter((e) => e != undefined));
  };

  return (
    <View style={{ padding: 20 }}>
      <TealButton
        text="Attach a file"
        style={{ alignSelf: "center" }}
        onPress={pickImage}
      />
      <View style={{ marginTop: 15 }}>
        {files &&
          files.map((e, index) => (
            <Selectable
              key={index}
              isActive={false}
              bgColor={colors.tealLight95}
              onPress={() => handleRemoveFile(index)}
              icon={
                <AntDesign name="delete" size={12} color={colors.teal100} />
              }
              style={{ height: 35 }}
              contentStyle={{ height: 35 }}
            >
              {e.fileName}
            </Selectable>
          ))}
      </View>

      <ColoredText color="teal" style={{ fontSize: 16, marginTop: 15 }}>
        {files.length} files attached
      </ColoredText>

      <View style={{ alignSelf: "center", marginTop: 15 }}>
        <TealButton
          text="Upload"
          style={{ width: 285 }}
          onPress={() => {
            setSelectedItem(files);
            closeModal();
          }}
        />
      </View>
    </View>
  );
}
