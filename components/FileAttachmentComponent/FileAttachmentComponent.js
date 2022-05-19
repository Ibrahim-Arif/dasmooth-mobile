import React, { useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ColoredText from "../ColoredText/ColoredText";
import TealButton from "../TealButton/TealButton";
import Selectable from "../Selectable/Selectable";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function FileAttachmentComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
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
      {/* Drag and Drop Container */}
      <ScrollView>
        <TouchableNativeFeedback onPress={pickImage}>
          <View style={styles.dragDropContainer}>
            <AntDesign name="inbox" size={45} color={colors.teal100} />
            <ColoredText>Drag and drop here</ColoredText>
            <ColoredText>or</ColoredText>
            <ColoredText color="grey">BROWSE OR SELECT FILES</ColoredText>
          </View>
        </TouchableNativeFeedback>

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

        <ColoredText color="teal" style={styles.attachFileText}>
          {files.length} files attached
        </ColoredText>

        <View style={styles.tealButtonContainer}>
          <TealButton
            text="Upload"
            style={{ width: 285 }}
            onPress={() => {
              setSelectedItem(files);
              closeScreen();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dragDropContainer: {
    paddingLeft: 10,
    height: 300,
    marginBottom: 10,
    borderStyle: "dashed",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: colors.teal100,
    justifyContent: "center",
    alignItems: "center",
  },
  tealButtonContainer: { alignSelf: "center", marginTop: 15 },
  attachFileText: { fontSize: 16, marginTop: 15 },
});
