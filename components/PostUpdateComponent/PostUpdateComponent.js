import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import moment from "moment";

import { useUser } from "../../hooks/useContext";
import { widths } from "../../utilities/sizes";
import { colors } from "../../utilities/colors";

import { handleAddPostUpdate, handleGetBatonPostUpdates } from "../../services";
import TealButton from "../TealButton/TealButton";
import logResponse from "../../utilities/logger";
import { v4 } from "uuid";

export default function PostUpdateComponent({
  itemSelected,
  setItemSelected,
  closeScreen,
  batonId = null,
}) {
  const [text, setText] = useState("");
  const [postData, setPostData] = useState([]);
  const { isLogin, photoURL } = useUser();
  const toast = useToast();

  useEffect(() => {
    if (itemSelected) setPostData(itemSelected);
  }, []);

  const handlePostUpdate = () => {
    let url =
      photoURL == null || photoURL == undefined || photoURL.includes("blob")
        ? ""
        : photoURL;

    if (text != "" && text != undefined && batonId != null) {
      let data = {
        batonId,
        text: text,
        timestamp: Date.now(),
        username: isLogin.email,
        photoURL: url,
      };

      setText("");
      setItemSelected("some update added");
      handleAddPostUpdate(data)
        .then(() => {
          toast.show("Post Update Successfully", {
            type: "success",
            style: { height: 50 },
          });
          setPostData((pre) => [data, ...pre]);
        })
        .catch((ex) => {
          logResponse("error", ex.message);
          toast.show("Post Update Failed", {
            type: "danger",
            style: { height: 50 },
          });
        });
    }
  };
  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TextInput
        label="Post an update"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{ width: "100%" }}
        mode="outlined"
        // multiline
      />
      <View style={{ marginTop: 15 }}>
        <TealButton text="POST UPDATE" onPress={handlePostUpdate} />
      </View>

      <ScrollView
        style={{ width: "100%", marginTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {postData.map((e, i) => (
            <View key={i} style={styles.commentContainer}>
              <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                {e.photoURL != "" && e.photoURL ? (
                  <Avatar.Image source={{ uri: e.photoURL }} size={54} />
                ) : (
                  <Avatar.Text
                    style={{ backgroundColor: colors.teal100 }}
                    label={e.username.substring(0, 2).toUpperCase()}
                    size={54}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 10,
                  width: 0,
                  flexGrow: 1,
                  flex: 1,
                }}
              >
                <Text style={{ fontSize: 13 }}>{e.username}</Text>
                <Text style={{ fontSize: 13 }}>
                  {moment(e.timestamp).format("MMMM DD, YYYY - hh:mm:ss A ")}
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    textAlign: "justify",
                  }}
                >
                  {e.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 250 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    // backgroundColor: "tomato",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    minHeight: 80,
    width: widths.width90,
    flexDirection: "row",
  },
});
