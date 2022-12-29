import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableNativeFeedback, View, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as DocumentPicker from "expo-document-picker";

import ColoredText from "../ColoredText/ColoredText";
import TealButton from "../TealButton/TealButton";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { ScrollView } from "react-native-gesture-handler";
import {
  handleAddBatonFiles,
  handleGetBatonFiles,
  handleUploadFile,
} from "../../services";
import { ActivityIndicator } from "react-native-paper";
import { heights, widths } from "../../utilities/sizes";
import { useToast } from "react-native-toast-notifications";
import logResponse from "../../utilities/logger";
import { v4 } from "uuid";

export default function FileAttachmentComponent({
  selectedItem,
  setSelectedItem,
  closeScreen,
  batonId,
}) {
  const [fileData, setFileData] = useState({ filesList: [] });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  // const [selectedImageToView, setSelectedImageToView] = useState("");
  // const [isVisible, setIsVisible] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const toast = useToast();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // const showModal = () => setIsVisible(true);
  // const hideModal = () => setIsVisible(false);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   });
  //   // console.log("\n\n\nRESULT:'");
  //   // console.log(result);
  //   const items = [...fileData.filesList];
  //   if (!result.cancelled) {
  //     let fileName = "";
  //     fileName = result.uri.split("/").slice(-1)[0];
  //     result.fileName = fileName;
  //     items.push(result);
  //     setFileData({ ...fileData, filesList: items });
  //     // console.log(items);
  //   }
  // };

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // console.log("\n\n\nRESULT:'");
    // console.log(result);
    const items = [...fileData.filesList];
    if (!result.cancelled) {
      let temp = { ...result };
      temp.fileName = result.name;
      items.push(temp);
      setFileData({ ...fileData, filesList: items });
      // console.log(items);
    }
  };
  const handleRemoveFile = (index) => {
    let temp = fileData.filesList;
    delete temp[index];

    setFileData({
      ...fileData,
      filesList: temp.filter((e) => e != undefined),
    });
  };

  const handleUpload = () => {
    if (batonId == null) {
      toast.show("Baton Id is null", { type: "danger" });
      return;
    }
    if (fileData.filesList.length == 0) return;
    setUploading(true);

    for (let i = 0; i < fileData.filesList.length; i++) {
      console.log(fileData.filesList[i]);
      handleUploadFile(
        fileData.filesList[i].uri,
        fileData.filesList[i].fileName,
        batonId
      )
        .then((res) => {
          let filesData = {
            file: res,
            batonId: batonId,
            fileName: fileData.filesList[i].fileName,
          };

          setFileData({ filesList: [] });

          handleAddBatonFiles(filesData)
            .then(() => {
              // generateNotification("success", "files uploaded successfully");
              toast.show("files uploaded successfully", {
                type: "success",
                style: { height: 50 },
              });
              setUploading(false);
              setUploadCount(uploadCount + 1);

              // clickOk();
            })
            .catch((ex) => {
              toast.show("Error uploading files", {
                type: "danger",
                style: { height: 50 },
              });
              // generateNotification("error", "Failed to upload files!");
              setUploading(false);
            });
        })
        .catch((ex) => {
          console.log(ex.message);
          toast.show("Error uploading files", {
            type: "danger",
            style: { height: 50 },
          });
          // generateNotification("error", "Failed to upload files!");
          setUploading(false);
        });
    }
    // closeScreen();
  };

  const handleSaveFileToGallery = async (file) => {
    try {
      setDownloading(file.fileName);
      if (status !== "granted") {
        requestPermission();
        const downloadInstance = FileSystem.createDownloadResumable(
          file.file,
          FileSystem.documentDirectory + file.fileName
        );

        const result = await downloadInstance.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync("MediaDownloads", asset, false);

        toast.show(file.fileName + " saved to MediaDownloads folder", {
          type: "success",
          style: { height: 50 },
        });
      } else {
        const downloadInstance = FileSystem.createDownloadResumable(
          file.file,
          FileSystem.documentDirectory + file.fileName
        );

        const result = await downloadInstance.downloadAsync();
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync("MediaDownloads", asset, false);

        // await FileSystem.writeAsStringAsync(filename, result);
        // await MediaLibrary.saveToLibraryAsync(result.uri);

        toast.show(file.fileName + " saved to MediaDownloads folder", {
          type: "success",
          style: { height: 50 },
        });
      }
      setDownloading(false);
    } catch (ex) {
      logResponse("error", ex.message);
      toast.show(ex.message, {
        type: "danger",
        style: { height: 50 },
      });
      setDownloading(false);
    }
  };

  useEffect(() => {
    return () => {
      // console.log(fileData);
      // if imagedata or uploadedfiles is empty, then it means that the user has not uploaded any files
      if (fileData.filesList.length == 0 && uploadedFiles.length == 0)
        setSelectedItem({
          filesList: [...fileData.filesList, ...uploadedFiles],
          text: "Attach a file",
        });
      // else there are some files which we want to send to the baton form screen
      // so that we can show the files length in the baton form screen
      else
        setSelectedItem({
          filesList: [...fileData.filesList, ...uploadedFiles],
          text: `${uploadedFiles.length} files attached`,
        });
    };
  }, [fileData, uploadedFiles]);

  useEffect(() => {
    // console.log(batonId);
    // fetching the baton files from firebase
    handleGetBatonFiles(batonId, setUploadedFiles);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {/* Drag and Drop Container */}

      <TouchableNativeFeedback onPress={pickFile}>
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
              {fileData.filesList &&
                fileData.filesList.map((e, index) => (
                  <View key={v4()}>
                    <TouchableNativeFeedback
                      onPress={() => handleRemoveFile(index)}
                    >
                      <View style={styles.filesContainer}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "400",
                            marginLeft: 15,
                            flexWrap: "wrap",
                            flex: 1,
                          }}
                        >
                          {e.fileName}
                        </Text>
                        <AntDesign
                          name="delete"
                          size={15}
                          color={colors.teal100}
                        />
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                ))}
            </View>
            <View style={{}}>
              {uploadedFiles.map((e, index) => (
                <View key={v4()}>
                  <TouchableNativeFeedback
                    onPress={() => {
                      handleSaveFileToGallery(e);
                      // setSelectedImageToView(e.image);
                      // setIsVisible(true);
                    }}
                  >
                    <View style={styles.filesContainer}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                          marginLeft: 15,
                        }}
                      >
                        {e.fileName}
                      </Text>
                      {downloading == e.fileName ? (
                        <ActivityIndicator size={15} color={colors.teal100} />
                      ) : (
                        <AntDesign
                          name="download"
                          size={15}
                          color={colors.teal100}
                        />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      {/* [2022-07-08] if we are in uploading state we will not show the files count */}

      {!uploading && (
        <ColoredText color="teal" style={styles.attachFileText}>
          {fileData.filesList.length > 0
            ? fileData.filesList.length + uploadedFiles.length
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
  filesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: colors.azure,
    marginVertical: 5,
  },
});
