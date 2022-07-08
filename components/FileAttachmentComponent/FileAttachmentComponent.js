import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ColoredText from "../ColoredText/ColoredText";
import TealButton from "../TealButton/TealButton";
import Selectable from "../Selectable/Selectable";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { ScrollView } from "react-native-gesture-handler";
import { handleAddBatonFiles, handleGetBatonFiles } from "../../services";
import { ActivityIndicator } from "react-native-paper";
import { heights } from "../../utilities/sizes";
import { useToast } from "react-native-toast-notifications";

export default function FileAttachmentComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
  batonId,
}) {
  const [imageData, setImageData] = useState({ filesList: [] });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const toast = useToast();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    // console.log("\n\n\nRESULT:'");
    // console.log(result);
    const items = [...imageData.filesList];
    if (!result.cancelled) {
      let fileName = "";
      fileName = result.uri.split("/").slice(-1)[0];
      result.fileName = fileName;
      items.push(result);
      setImageData({ ...imageData, filesList: items });
      // console.log(items);
    }
  };

  const handleRemoveFile = (index) => {
    let temp = imageData.filesList;
    delete temp[index];

    setImageData({
      ...imageData,
      filesList: temp.filter((e) => e != undefined),
    });
  };

  const handleUpload = () => {
    if (batonId == null) {
      toast.show("Baton Id is null", { type: "danger" });
      return;
    }
    setUploading(true);
    for (let i = 0; i < imageData.filesList.length; i++) {
      // var reader = new FileReader();

      let imagesData = {
        image: imageData.filesList[i].base64,
        batonId: batonId,
        fileName: imageData.filesList[i].fileName,
      };
      setImageData({ filesList: [] });
      handleAddBatonFiles(imagesData)
        .then(() => {
          // generateNotification("success", "Images uploaded successfully");
          toast.show("Images uploaded successfully", {
            type: "success",
            style: { height: 50 },
          });
          setUploading(false);
          setUploadCount(uploadCount + 1);

          // clickOk();
        })
        .catch((ex) => {
          toast.show("Error uploading images", {
            type: "danger",
            style: { height: 50 },
          });
          // generateNotification("error", "Failed to upload files!");
          setUploading(false);
        });
    }
    // closeScreen();
  };

  useEffect(() => {
    return () => {
      // console.log(imageData);
      // if imagedata or uploadedfiles is empty, then it means that the user has not uploaded any files
      if (imageData.filesList.length == 0 && uploadedFiles.length == 0)
        setSelectedItem({
          filesList: [...imageData.filesList, ...uploadedFiles],
          text: "Attach a file (Optional)",
        });
      // else there are some files which we want to send to the baton form screen
      // so that we can show the files length in the baton form screen
      else
        setSelectedItem({
          filesList: [...imageData.filesList, ...uploadedFiles],
          text: `${uploadedFiles.length} files attached`,
        });
    };
  }, [imageData, uploadedFiles]);

  useEffect(() => {
    // console.log(batonId);
    // fetching the baton files from firebase
    handleGetBatonFiles(batonId, setUploadedFiles);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {/* Drag and Drop Container */}

      <TouchableNativeFeedback onPress={pickImage}>
        <View style={styles.dragDropContainer}>
          <AntDesign name="inbox" size={45} color={colors.teal100} />
          <ColoredText>Tap to browse the files</ColoredText>
          {/* <ColoredText>or</ColoredText>
          <ColoredText color="grey">BROWSE OR SELECT FILES</ColoredText> */}
        </View>
      </TouchableNativeFeedback>
      <ScrollView
        bounces={false}
        style={{ height: heights.height20p }}
        // endFillColor={colors.tealLight90}
      >
        {!uploading && (
          <>
            <View style={{ marginTop: 15 }}>
              {imageData.filesList &&
                imageData.filesList.map((e, index) => (
                  <Selectable
                    key={index}
                    isActive={false}
                    bgColor={colors.tealLight95}
                    onPress={() => handleRemoveFile(index)}
                    icon={
                      <AntDesign
                        name="delete"
                        size={12}
                        color={colors.teal100}
                      />
                    }
                    style={{ height: 35 }}
                    contentStyle={{ height: 35 }}
                  >
                    {e.fileName}
                  </Selectable>
                ))}
            </View>
            <View style={{ marginTop: 15 }}>
              {uploadedFiles.map((e, index) => (
                <Selectable
                  key={index}
                  isActive={false}
                  bgColor={colors.tealLight95}
                  // onPress={() => handleRemoveFile(index)}
                  icon={
                    <AntDesign
                      name="download"
                      size={12}
                      color={colors.teal100}
                    />
                  }
                  style={{ height: 35 }}
                  contentStyle={{ height: 35 }}
                >
                  {e.fileName}
                </Selectable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      {/* [2022-07-08] if we are in uploading state we will not show the files count */}

      {!uploading && (
        <ColoredText color="teal" style={styles.attachFileText}>
          {imageData.filesList.length > 0
            ? imageData.filesList.length + uploadedFiles.length
            : uploadedFiles.length}{" "}
          files attached
        </ColoredText>
      )}

      <View style={styles.tealButtonContainer}>
        {uploading ? (
          <ActivityIndicator size={40} />
        ) : (
          <TealButton
            text="Upload"
            style={{ width: 285 }}
            onPress={handleUpload}
          />
        )}
      </View>
      <View style={{ height: 50 }}></View>
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
