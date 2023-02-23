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
  itemSelected,
  setItemSelected,
  closeScreen,
  batonId,
}) {
  const [uploadableFiles, setUploadableFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const toast = useToast();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // console.log("\n\n\nRESULT:'");
    // console.log(result);
    if (!result.cancelled && result.type != "cancel") {
      let file = { ...result };
      file.fileName = result.name;
      setUploadableFiles((fileData) => [...fileData, file]);
      // console.log(items);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadableFiles((fileData) => {
      const newFileList = fileData.slice();
      newFileList.splice(index, 1);
      return [...newFileList];
    });
  };

  const handleUpload = () => {
    if (uploadableFiles?.length == 0) return;
    if (batonId == null) {
      toast.show("Baton Id is null", { type: "danger" });
      return;
    }

    setUploading(true);

    for (let i = 0; i < uploadableFiles.length; i++) {
      // console.log(uploadableFiles[i]);
      handleUploadFile(
        uploadableFiles[i].uri,
        uploadableFiles[i].fileName,
        batonId
      )
        .then((res) => {
          let filesData = {
            file: res,
            batonId: batonId,
            fileName: uploadableFiles[i].fileName,
          };

          handleAddBatonFiles(filesData)
            .then(() => {
              // generateNotification("success", "files uploaded successfully");
              toast.show("files uploaded successfully", {
                type: "success",
                style: { height: 50 },
              });
              if (itemSelected == null) {
                setItemSelected([filesData]);
              } else setItemSelected((prev) => [...prev, filesData]);
              setUploading(false);
              setUploadableFiles([]);
              closeScreen();
            })
            .catch((ex) => {
              toast.show("Error adding files doc", {
                type: "danger",
                style: { height: 50 },
              });

              setUploading(false);
            });
        })
        .catch((ex) => {
          console.log(ex.message);
          toast.show("Error uploading files", {
            type: "danger",
            style: { height: 50 },
          });

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
    // handleGetBatonFilesSnapshotSnapshot(batonId, setUploadedFiles);
    if (itemSelected != null && batonId != null) {
      setUploadedFiles(itemSelected);
    }
    console.log("batonFiles useEffect", itemSelected?.length);
  }, [itemSelected?.length]);

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
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
              {uploadableFiles.length > 0 &&
                uploadableFiles.map((e, index) => (
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

            <View>
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
          {uploadedFiles.length + uploadableFiles.length} files attached
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

      <View style={{ height: 50 }} />
    </ScrollView>
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
