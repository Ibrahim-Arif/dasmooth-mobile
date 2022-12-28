import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Menu,
  TextInput,
} from "react-native-paper";

import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { v4 } from "uuid";
import moment from "moment";
import "react-native-get-random-values";

import { Selectable, TealButton, NotificationBox } from "../components";
import { colors } from "../utilities/colors";
import { useUser } from "../hooks/useContext";
import {
  handleAddBaton,
  handleAddNotification,
  handleDeleteBaton,
  handleGetBatonFiles,
  handleUpdateBaton,
} from "../services";
import logResponse from "../utilities/logger";
import { StackActions } from "@react-navigation/native";
import { useMemo } from "react";

const popAction = StackActions.pop(1);

export default function BatonFormScreen({ route, navigation }) {
  const { batonId } = route.params;
  const { batonsData, isLogin } = useUser();
  const toast = useToast();

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
  const [description, setDescription] = useState("");
  const [dateData, setDateData] = useState("Set a deadline");
  const [budgetData, setBudgetData] = useState("Set a budget");
  const [postUpdateData, setPostUpdateData] = useState("");
  const [filesList, setFilesList] = useState({
    text: "Attach a file",
    filesList: [],
  });
  const [batonType, setBatonType] = useState(null);
  const [id, setID] = useState();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetchedDataObject, setFetchedDataObject] = useState({
    status: "pending",
    deletedOn: 0,
  });
  const [fetchingLoading, setFetchingLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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

  const handlePass = () => {
    // console.log(
    //   dateData,
    //   budgetData,
    //   postUpdateData,
    //   filesList.filesList,
    //   title
    // );

    if (isNewPost) {
      // console.log("New");
      logResponse("notify", "Creating New Baton!");
      let post = {
        deadline: dateData,
        budget: budgetData,
        title,
        authorId: isLogin.uid,
        memberId: teamMemberData.id,
        authorName:
          isLogin.displayName != null ? isLogin.displayName : isLogin.email,
        memberName: teamMemberData.text,
        authorPostStatus:
          teamMemberData.status == "accepted" ? "passed" : "pending",
        memberPostStatus: "received",
        createdOn: Date.now(),
        deletedOn: 0,
        description: description,
      };
      // console.log("new Post");
      // console.log(post);
      // return;
      setLoading(true);

      // console.log("Adding new post");

      handleAddBaton(post, id)
        .then((docId) => {
          handleAddNotification({
            seen: false,
            message: "Baton Received",
            description: `You received a new Baton from ${post.authorName}`,
            type: teamMemberData.status == "accepted" ? "passed" : "pending",
            uid: post.memberId,
            date: Date.now(),
            batonId: docId,
          });

          toast.show("You baton is created", {
            type: "success",
            style: { height: 50 },
          });
          setLoading(false);
          navigation.navigate("DashboardMain");
        })
        .catch((ex) => {
          toast.show("Failed to create your baton", {
            type: "error",
            style: { height: 50 },
          });
          logResponse("error", ex.message);
          setLoading(false);
        });
    } else {
      logResponse("notify", "Updating Baton!");
      let editedPost = {
        ...fetchedDataObject,
        deadline: dateData,
        budget: budgetData,
        title: title,
        description: description,
        memberName: teamMemberData.text,
        updateOn: Date.now(),
      };

      // console.log(editedPost);
      // return;
      setLoading(true);
      handleUpdateBaton(id, editedPost)
        .then(() => {
          setLoading(false);
          toast.show("Baton is update", {
            type: "success",
            style: { height: 50 },
          });
          navigation.navigate("DashboardMain");
        })
        .catch((ex) => {
          setLoading(false);
          toast.show("Failed to update your baton", {
            type: "error",
            style: { height: 50 },
          });
          logResponse("error", ex.message);
        });
    }
  };

  const handleDeleteClick = () => {
    setLoading(true);

    handleDeleteBaton(fetchedDataObject.docId)
      .then(() => {
        setLoading(false);
        toast.show("Baton is deleted", {
          type: "success",
          style: { height: 50 },
        });
        navigation.navigate("DashboardMain");
      })
      .catch((ex) => {
        setLoading(false);
        toast.show("Failed to delete your baton", {
          type: "error",
          style: { height: 50 },
        });
        logResponse("error", ex.message);
      });
  };

  const handleDuplicateClick = () => {
    setLoading(true);
    let temp = fetchedDataObject;
    temp.title = `${temp.title} (Duplicate)`;

    handleAddBaton(temp, v4())
      .then(() => {
        setLoading(false);
        toast.show("Baton is duplicated", {
          type: "success",
          style: { height: 50 },
        });
        navigation.navigate("DashboardMain");
      })
      .catch((ex) => {
        setLoading(false);
        toast.show("Failed to duplicate your baton", {
          type: "error",
          style: { height: 50 },
        });
        logResponse("error", ex.message);
      });
  };

  const showConfirmDialog = (message, method) => {
    return Alert.alert("Confirmation", message, [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          method();
          closeMenu();
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (batonId != null)
        setFilesList({
          filesList: uploadedFiles,
          text: `${uploadedFiles.length} files attached`,
        });
    }
    return () => (isMounted = false);
  }, [uploadedFiles]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (
        dateData != "Set a deadline" &&
        budgetData != "Set a budget" &&
        teamMemberData != "Select a team member" &&
        title != "" &&
        description != ""
      )
        setDisabled(false);
      else setDisabled(true);
    }
    // console.log(disabled);
    return () => (isMounted = false);
  }, [
    dateData,
    budgetData,
    postUpdateData,
    title,
    teamMemberData,
    description,
  ]);

  useEffect(() => {
    // console.log("BatonFormScreen Line 76: batonID", batonId);
    logResponse("info", "BatonFormScreen Line 278: Params batonID: " + batonId);

    if (batonId != null) {
      setFetchingLoading(true);
      handleGetBatonFiles(batonId, setUploadedFiles);
      setIsNewPost(false);
      if (batonsData.length == 0) return;

      let filter = batonsData.filter((e) => e.docId == batonId);
      filter = filter[0];

      // if filter is undefined, then it means that there is some issue with the data is not available in the batonsData array
      if (filter == undefined) {
        toast.show("Baton is not available", {
          type: "warning",
          style: { height: 50 },
        });
        navigation.navigate("DashboardMain");
        return;
      }

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

      logResponse("warning", " isDeleted: " + isDeleted);
      logResponse("warning", " isEditable: " + isEditable);

      setFetchedDataObject(filter);
      setTitle(filter.title);
      setDescription(filter.description);
      setBudgetData(filter.budget);

      setDateData(filter.deadline);
      setPostUpdateData(filter.post);
      setTeamMemberData({
        text: filter.memberName,
        icon: null,
      });
      setID(batonId);

      setFetchingLoading(false);
    } else {
      let tempId = v4();
      setID(tempId);
      setIsNewPost(true);
      setFetchingLoading(false);
      flushData();
    }
    // logResponse("info", "Baton ID:" + id);
  }, [batonId]);

  const editableFields = useMemo(() => {
    if (isNewPost) {
      return {
        title: true,
        description: true,
        teamMember: true,
        date: true,
        budget: true,
        postUpdate: true,
        files: true,
      };
    } else {
      // console.log(fetchedDataObject);
      if (fetchedDataObject.authorId == isLogin.uid)
        switch (fetchedDataObject.authorPostStatus) {
          case "pending":
            return {
              title: true,
              description: true,
              teamMember: true,
              date: true,
              budget: true,
              postUpdate: true,
              files: true,
            };
          case "passed":
            return {
              title: false,
              description: false,
              teamMember: false,
              date: false,
              budget: false,
              postUpdate: true,
              files: true,
            };
        }
      else
        switch (fetchedDataObject.memberPostStatus) {
          case "received":
            return {
              title: false,
              description: false,
              teamMember: false,
              date: false,
              budget: false,
              postUpdate: true,
              files: true,
            };
        }
    }
  }, [batonId, isNewPost, fetchedDataObject]);

  return (
    <SafeAreaView style={styles.container}>
      {fetchingLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={48} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, marginTop: 25 }}>
          {/* Form Section */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <IconButton
              icon="arrow-left"
              onPress={
                () => navigation.dispatch(popAction)
                // isDeleted
                //   ? navigation.navigate("Deleted Batons")
                //   : navigation.navigate("DashboardMain")
              }
              size={26}
            />

            {!isDeleted &&
              batonId != null &&
              fetchedDataObject.authorId == isLogin.uid && (
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon={({ size, color }) => (
                        <Ionicons
                          name="ellipsis-vertical"
                          size={size}
                          color={color}
                        />
                      )}
                      onPress={openMenu}
                      size={24}
                    />
                  }
                >
                  <Menu.Item
                    onPress={() =>
                      showConfirmDialog(
                        "Are your sure you want to remove this baton?",
                        handleDeleteClick
                      )
                    }
                    title="Delete"
                    icon="delete"
                    style={{ height: 35 }}
                  />
                  <Menu.Item
                    onPress={() =>
                      showConfirmDialog(
                        "Are your sure you want to duplicate this baton?",
                        handleDuplicateClick
                      )
                    }
                    title="Duplicate"
                    icon="file"
                    style={{ height: 35 }}
                  />
                </Menu>
              )}
          </View>
          {isDeleted && (
            <NotificationBox
              text={`You deleted this on ${moment(
                fetchedDataObject.deletedOn
              ).format("MMMM DD ,YYYY")}`}
            />
          )}
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <TextInput
              style={{ marginTop: 25 }}
              placeholder="Add Title"
              onChangeText={(e) => setTitle(e)}
              mode="outlined"
              outlineColor="transparent"
              placeholderTextColor="black"
              value={title}
              disabled={
                fetchedDataObject.authorPostStatus != "pending" &&
                fetchedDataObject.authorPostStatus != undefined
                  ? true
                  : false
              }
            />
            <TextInput
              style={{ marginTop: 5 }}
              placeholder="Add Description"
              placeholderTextColor="black"
              onChangeText={(e) => setDescription(e)}
              mode="outlined"
              value={description}
              disabled={
                fetchedDataObject.authorPostStatus != "pending" &&
                fetchedDataObject.authorPostStatus != undefined
                  ? true
                  : false
              }
            />
            <Selectable
              style={{ marginTop: 25 }}
              bgColor={colors.azure}
              isEditable={
                editableFields?.teamMember &&
                teamMemberData.text != "Select a team member"
              }
              text={teamMemberData.text.substring(0, 2).toUpperCase()}
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
              bgColor={colors.azure}
              icon={({ size, color }) => (
                <AntDesign name="calendar" size={size} color={color} />
              )}
              isEditable={editableFields?.date && dateData != "Set a deadline"}
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
              isEditable={
                editableFields?.budget && budgetData != "Set a budget"
              }
              bgColor={colors.azure}
              icon={({ color, size }) => (
                <FontAwesome name="dollar" size={size} color={color} />
              )}
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
              isEditable={
                editableFields?.files && filesList.text != "Attach a file"
              }
              bgColor={colors.azure}
              icon="attachment"
              isActive={
                filesList.filesList.length > 0 || batonId != null ? true : false
              }
              onPress={() =>
                !isDeleted &&
                navigation.navigate("FileSelection", {
                  setSelectedItem: (e) => setFilesList(e),
                  selectedItem: filesList,
                  batonId: id,
                })
              }
            >
              {/* {filesList.filesList.length > 0
              ? `${filesList.filesList.length} files attached`
              : "Attach a file (Optional)"} */}
              {filesList.text}
            </Selectable>

            <Selectable
              isEditable={editableFields?.postUpdate && postUpdateData != ""}
              bgColor={colors.azure}
              icon="post"
              onPress={() =>
                !isDeleted &&
                navigation.navigate("PostUpdateSelection", {
                  setSelectedItem: (e) => setPostUpdateData(e),
                  selectedItem: postUpdateData,
                  batonId: id,
                })
              }
              isActive={postUpdateData != ""}
            >
              Post an update
            </Selectable>

            <View style={{ marginTop: 15 }}>
              {loading ? (
                <ActivityIndicator size={26} />
              ) : (
                isEditable &&
                !isDeleted && (
                  <TealButton
                    disabled={disabled}
                    onPress={handlePass}
                    text="Pass"
                  />
                )
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? 24 : 0
  },
});
