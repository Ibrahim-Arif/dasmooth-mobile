import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  TextInput,
} from "react-native-paper";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { v4 } from "uuid";
import "react-native-get-random-values";

import { Selectable } from "../components";
import { colors } from "../utilities/colors";
import { useUser } from "../hooks/useContext";
import { handleGetBatonFiles } from "../services";

export default function DashboardScreen({ route, navigation }) {
  const { batonId } = route.params;
  const { batonsData, isLogin } = useUser();

  const [mode, setMode] = useState(0);
  const [activeTitle, setActiveTitle] = useState("Dummy Title");
  const [activeComponent, setActiveComponent] = useState(null);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [teamMemberData, setTeamMemberData] = useState({
    text: "Select a team member",
    icon: (
      <Avatar.Icon
        size={40}
        icon={({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        )}
      />
    ),
  });
  const [title, setTitle] = useState("");
  const [dateData, setDateData] = useState("Set a deadline");
  const [budgetData, setBudgetData] = useState("Set a budget");
  const [postUpdateData, setPostUpdateData] = useState("");
  const [filesList, setFilesList] = useState({
    text: "Attach a file (Optional)",
    filesList: [],
  });

  const [id, setID] = useState();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchedDataObject, setFetchedDataObject] = useState({
    status: "pending",
    deletedOn: 0,
  });

  const [isEditable, setIsEditable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const flushData = () => {
    setActiveComponent(null);
    setActiveItemIndex(-1);
    setActiveTitle("");
    setTeamMemberData({
      text: "Select a team member",
      icon: (
        <Avatar.Icon
          size={40}
          icon={({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          )}
        />
      ),
    });
    setDateData("Set a deadline");
    setBudgetData("Set a budget");
    setPostUpdateData("");
  };

  useEffect(
    () =>
      setFilesList({
        filesList: uploadedFiles,
        text: `${uploadedFiles.length} files attached`,
      }),
    [uploadedFiles]
  );

  useEffect(() => {
    console.log("BatonFormScreen Line 76: batonID", batonId);

    if (batonId != null) {
      handleGetBatonFiles(batonId, setUploadedFiles);
      setIsNewPost(false);
      if (batonsData.length == 0) return;

      let filter = batonsData.filter((e) => e.docId == batonId);
      filter = filter[0];
      // console.log(filter);

      // if filter is undefined, then it means that there is some issue with the data
      if (filter == undefined) return;

      // if baton status is passed or received and memberId is same as logged in user,
      // then it means that the user is not the owner of the baton and cannot edit it
      if (
        filter.authorPostStatus == "passed" ||
        (filter.memberPostStatus == "received" &&
          filter.memberId == isLogin.uid)
      )
        setIsEditable(false);

      if (
        filter.authorPostStatus == "deleted" ||
        filter.authorPostStatus == "received"
      )
        setIsDeleted(true);

      console.log("BatonFormScreen Line 104: editable:", isEditable);
      setFetchedDataObject(filter);
      setTitle(filter.title);
      setBudgetData(filter.budget);

      setDateData(filter.deadline);
      setPostUpdateData(filter.post);
      setTeamMemberData({
        text: filter.memberName,
        icon: null,
      });
      setID(batonId);
    } else {
      let tempId = v4();
      setID(tempId);
      setIsNewPost(true);
      flushData();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, marginTop: 25 }}>
        {/* Form Section */}
        <IconButton
          icon="arrow-left"
          onPress={() => navigation.navigate("DashboardMain")}
          size={26}
        />
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 24 }}>
            {title != "" ? title : "Add Title"}
          </Text>
          <TextInput
            style={{ marginTop: 25 }}
            placeholder="Add Text"
            onChangeText={(e) => setTitle(e)}
            mode="outlined"
            value={title}
            disabled={
              fetchedDataObject.authorPostStatus != "pending" &&
              fetchedDataObject.authorPostStatus != undefined
                ? true
                : false
            }
          />
          <Selectable
            style={{ marginTop: 25 }}
            bgColor={colors.tealLight90}
            icon={
              <Avatar.Text
                size={36}
                style={{
                  backgroundColor: batonId != null ? "white" : colors.teal100,
                  color: batonId == null ? "white" : colors.teal100,
                }}
                label={teamMemberData.text.substring(0, 2).toUpperCase()}
              />
            }
            isActive={teamMemberData.text != "Select a team member"}
            onPress={() =>
              isEditable &&
              !isDeleted &&
              navigation.navigate("MemberSelection", {
                setSelectedItem: (e) => setTeamMemberData(e),
              })
            }
          >
            {teamMemberData.text}
          </Selectable>
          <Selectable
            bgColor={colors.tealLight90}
            icon={
              <Avatar.Icon
                size={40}
                icon={({ color, size }) => (
                  <AntDesign name="calendar" size={size} color={color} />
                )}
              />
            }
            isActive={dateData != "Set a deadline"}
            onPress={() =>
              isEditable &&
              !isDeleted &&
              navigation.navigate("DateSelection", {
                setSelectedItem: (e) => setDateData(e),
                selectedItem: dateData,
              })
            }
          >
            {dateData}
          </Selectable>
          <Selectable
            bgColor={colors.tealLight90}
            icon={
              <Avatar.Icon
                size={40}
                icon={({ color, size }) => (
                  <FontAwesome name="dollar" size={size} color={color} />
                )}
              />
            }
            onPress={() =>
              isEditable &&
              !isDeleted &&
              navigation.navigate("BudgetSelection", {
                setSelectedItem: (e) => setBudgetData(e),
                selectedItem: budgetData,
              })
            }
            isActive={budgetData != "Set a budget"}
          >
            {budgetData}
          </Selectable>
          <Selectable
            bgColor={colors.tealLight90}
            icon={<Avatar.Icon size={40} icon="attachment" />}
            isActive={filesList.filesList.length > 0}
            onPress={() =>
              !isDeleted &&
              navigation.navigate("FileSelection", {
                setSelectedItem: (e) => setFilesList(e),
                selectedItem: filesList,
                batonId: batonId,
              })
            }
          >
            {/* {filesList.filesList.length > 0
              ? `${filesList.filesList.length} files attached`
              : "Attach a file (Optional)"} */}
            {filesList.text}
          </Selectable>
          <Selectable
            bgColor={colors.tealLight90}
            icon={<Avatar.Icon size={40} icon="post" />}
            onPress={() =>
              !isDeleted &&
              navigation.navigate("PostUpdateSelection", {
                setSelectedItem: (e) => setPostUpdateData(e),
                selectedItem: postUpdateData,
              })
            }
            isActive={postUpdateData != ""}
          >
            Post an update
          </Selectable>
          {loading ? (
            <ActivityIndicator />
          ) : (
            isEditable &&
            !isDeleted && (
              <Selectable
                isActive={true}
                contentStyle={{ justifyContent: "center" }}
                // disabled={true}
                onPress={() => navigation.navigate("DashboardMain")}
              >
                Pass
              </Selectable>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? 24 : 0
  },
});
