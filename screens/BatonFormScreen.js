import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  Text,
} from "react-native";
import {
  ActivityIndicator,
  Avatar,
  IconButton,
  Menu,
  TextInput,
  Button,
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
  handleGetBatonFilesSnapshot,
  handleGetBatonPostUpdates,
  handleUpdateBaton,
} from "../services";
import logResponse from "../utilities/logger";
import { StackActions } from "@react-navigation/native";
import { useMemo } from "react";
import { widths } from "../utilities/sizes";

const popAction = StackActions.pop(1);

export default function BatonFormScreen({ route, navigation }) {
  const { id } = route.params;
  const { batonsData, isLogin } = useUser();
  const toast = useToast();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDraftModalVisible, setIsDraftModalVisible] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");

  // 0 means no item is selected
  // 1 means the first item is selected
  // 2 means the second item is selected
  // 3 means the third item is selected
  // 4 means the fourth item is selected
  // 5 means the fifth item is selected
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [teamMemberData, setTeamMemberData] = useState(null);
  const [dateData, setDateData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);
  const [postUpdateData, setPostUpdateData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filesList, setFilesList] = useState(null);
  const [batonId, setBatonId] = useState(null);
  const [allowGoBack, setAllowGoBack] = useState(false);

  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [dataFetchLoading, setDataFetchLoading] = useState(false);
  const [fetchedDataObject, setFetchedDataObject] = useState({
    status: "pending",
    deletedOn: 0,
  });
  const [isEditable, setIsEditable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewPost, setIsNewPost] = useState(true);
  const [isDraft, setIsDraft] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // Conditions

  // if baton is not delete and there is an id in the url and the author of the baton is the same as the logged in user
  const doShowDropDownMenuOnPage =
    !isDeleted && batonId && fetchedDataObject.authorId == isLogin.uid;

  const isTitleInputFieldDisabled =
    fetchedDataObject.authorPostStatus != "pending" &&
    fetchedDataObject.authorPostStatus != "draft" &&
    fetchedDataObject.authorPostStatus != undefined
      ? true
      : false;

  const isAddDescriptionInputFieldDisabled =
    fetchedDataObject.authorPostStatus != "pending" &&
    fetchedDataObject.authorPostStatus != "draft" &&
    fetchedDataObject.authorPostStatus != undefined
      ? true
      : false;

  const isSelectableItemPressable = isEditable && !isDeleted;

  const flushData = () => {
    setActiveItemIndex(0);
    // setID(null);
    // setTitle("");
    setActiveTitle("");
    setTeamMemberData(null);
    setDateData(null);
    setBudgetData(null);
    setPostUpdateData(null);
    setFilesList(null);
  };

  const handlePass = () => {
    // console.log(
    //   dateData,
    //   budgetData,
    //   postUpdateData,
    //   filesList.filesList,
    //   title
    // );

    if (isNewPost || isDraft) {
      // console.log("New");
      console.log(teamMemberData);
      let post = {
        deadline: dateData,
        budget: budgetData,
        title,
        authorId: isLogin.uid,
        memberId: teamMemberData.id,
        authorName:
          isLogin.displayName != null ? isLogin.displayName : isLogin.email,
        memberName: teamMemberData.name,
        authorPostStatus:
          teamMemberData.status == "accepted" ? "passed" : "pending",
        memberPostStatus: "received",
        createdOn: Date.now(),
        deletedOn: 0,
        description: description,
      };
      // console.log("new Post");
      console.log(post);
      // return;

      setLoading(true);
      // console.log("Adding new post");
      handleAddBaton(post, batonId)
        .then((docId) => {
          handleAddNotification({
            seen: false,
            message: "Baton Received",
            description: `You received a new Baton from ${post.authorName}`,
            type: "success",
            batonType: "received",
            uid: post.memberId,
            date: Date.now(),
            batonId: docId,
          });
          toast.show("You baton is created", {
            type: "success",
            style: { height: 50 },
          });
          setLoading(false);

          navigation.goBack();
        })
        .catch((ex) => {
          toast.show("Failed to create you baton", {
            type: "danger",
          });
          // console.log(ex);
          setLoading(false);
        });
    } else {
      // console.log("Edit");
      let editedPost = {
        ...fetchedDataObject,
        deadline: dateData,
        budget: budgetData,
        title: title,
        description: description,
        memberName: teamMemberData.name,
        updateOn: Date.now(),
      };
      console.log("editedPost", editedPost);
      // console.log(editedPost);
      // return;
      setLoading(true);
      handleUpdateBaton(batonId, editedPost)
        .then(() => {
          setLoading(false);
          navigation.goBack();
          toast.show("Baton is updated", {
            type: "success",
            style: { height: 50 },
          });
        })
        .catch((ex) => {
          setLoading(false);

          toast.show("Failed to update baton", {
            type: "danger",
          });
          console.log(ex);
        });
    }
  };

  const handleAddToDrafts = () => {
    let post = {
      deadline: dateData ? dateData : null,
      budget: budgetData ? budgetData : null,
      title: title ? title : "",
      authorId: isLogin.uid,
      memberId: teamMemberData?.id ? teamMemberData.id : null,
      authorName:
        isLogin.displayName != null ? isLogin.displayName : isLogin.email,
      memberName: teamMemberData?.name ? teamMemberData.name : null,
      authorPostStatus: "draft",
      memberPostStatus: "draft",
      createdOn: Date.now(),
      deletedOn: 0,
      description: description ? description : "",
    };
    // console.log("new Post");
    // console.log(post);
    // return;

    setModalLoading(true);
    // console.log("Adding new post");
    handleAddBaton(post, batonId)
      .then((docId) => {
        toast.show("Baton is saved", {
          type: "success",
          style: { height: 50 },
        });

        setModalLoading(false);
        navigation.goBack();
      })
      .catch((ex) => {
        toast.show("Failed to save baton", {
          type: "danger",
        });
        console.log(ex);
        setModalLoading(false);
      });
  };

  const resetFormView = () => {
    // console.log("resetFormView calling");
    setActiveItemIndex(0);
    setActiveTitle("");
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

  const editableFields = useMemo(() => {
    if (isNewPost || isDraft) {
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
      console.log(fetchedDataObject);
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
  }, [id]);

  useEffect(() => {
    // console.log("params:", params);
    if (id) {
      setDataFetchLoading(true);
      handleGetBatonFilesSnapshot(id, setFilesList);
      handleGetBatonPostUpdates(id, setPostUpdateData);
      setIsNewPost(false);
      if (batonsData.length == 0) return;

      let filter = batonsData.filter((e) => e.docId == id);
      filter = filter[0];
      // console.log(filter);

      if (filter == undefined) {
        setDataFetchLoading(false);
        return;
      }

      if (
        filter.authorPostStatus == "draft" &&
        filter.authorId == isLogin.uid
      ) {
        setIsEditable(true);
        setIsDraft(true);
        setFetchedDataObject(filter);
        setTitle(filter.title);
        setDescription(filter.description);

        if (filter.budget) setBudgetData(filter.budget);
        else setBudgetData(null);

        if (filter.deadline) setDateData(filter.deadline);
        else setDateData(null);

        if (filter.post) setPostUpdateData(filter.post);
        else setPostUpdateData(null);

        if (filter.memberName != null) {
          setTeamMemberData({
            name: filter.memberName,
            id: filter.memberId,
          });
        } else setTeamMemberData(null);

        setBatonId(id);
        setDataFetchLoading(false);
        //  if baton is type draft then we do need to check below code
        return;
      }

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

      // "editable:", isEditable;

      setFetchedDataObject(filter);
      setTitle(filter.title);
      setDescription(filter.description);

      setBudgetData(filter.budget);
      setDateData(filter.deadline);

      setPostUpdateData(filter.post);
      setTeamMemberData({
        name: filter.memberName,
        id: filter.memberId,
      });
      setBatonId(id);
      setDataFetchLoading(false);
      // console.log("filter", filter);
      // batonsData.forEach((e) => console.log(e.title, "|", e.docId));
    } else {
      let tempId = v4();
      setBatonId(tempId);

      setIsNewPost(true);
      if (!loading) {
        flushData();
        console.log("new post dta flushed");
      }
    }

    return () => null;
  }, []);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     if (!allowGoBack) {
  //       // console.log("ASDASD");
  //       e.preventDefault();
  //       setIsDraftModalVisible(true);
  //     }
  //   });
  // }, [navigation]);

  // console.log("batonID", batonId);
  return (
    <SafeAreaView style={styles.container}>
      {/* Draft Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDraftModalVisible}
        onRequestClose={() => setIsDraftModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: widths.width80p,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600" }}>Confirm</Text>
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setIsDraftModalVisible(false)}
              />
            </View>

            <View
              style={{
                marginTop: 20,
                width: widths.width80p,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 16, textAlign: "justify" }}>
                  You have unsaved changes to your Baton. Do you want to save
                  your changes?
                </Text>

                {modalLoading ? (
                  <ActivityIndicator
                    style={{ marginTop: 20 }}
                    size={26}
                    color={colors.teal100}
                  />
                ) : (
                  <>
                    <Button
                      mode="contained"
                      onPress={() => {
                        if (title === "")
                          return toast.show("Title is required", {
                            type: "warning",
                            style: { height: 50 },
                          });
                        handleAddToDrafts();
                      }}
                      style={{
                        width: widths.width80p,
                        alignSelf: "center",
                        marginTop: 25,
                      }}
                    >
                      SAVE BATON
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() => {
                        setIsDraftModalVisible(false);
                        navigation.goBack();
                      }}
                      style={{
                        width: widths.width80p,
                        alignSelf: "center",
                        marginTop: 10,
                      }}
                    >
                      DISCARD
                    </Button>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {dataFetchLoading ? (
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
              onPress={() => {
                const isAnyFieldNotEmpty =
                  teamMemberData != null ||
                  dateData != null ||
                  budgetData != null ||
                  description != "" ||
                  postUpdateData != null ||
                  filesList != null ||
                  title != "";

                if (isAnyFieldNotEmpty && (isNewPost || isDraft)) {
                  setIsDraftModalVisible(true);
                } else {
                  setIsDraftModalVisible(false);
                  navigation.dispatch(popAction);
                }
              }}
              size={26}
            />

            {doShowDropDownMenuOnPage && (
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
              style={{}}
              placeholder="Add Title"
              onChangeText={(e) => setTitle(e)}
              mode="outlined"
              outlineColor="transparent"
              placeholderTextColor="black"
              value={title}
              disabled={isTitleInputFieldDisabled}
            />
            <TextInput
              style={{ marginTop: 5 }}
              placeholder="Add Description"
              placeholderTextColor="black"
              onChangeText={(e) => setDescription(e)}
              mode="outlined"
              value={description}
              disabled={isAddDescriptionInputFieldDisabled}
            />

            {console.log(teamMemberData)}
            <Selectable
              style={{ marginTop: 25 }}
              bgColor={colors.azure}
              isEditable={editableFields?.teamMember}
              text={teamMemberData?.name?.substring(0, 2).toUpperCase()}
              icon={!teamMemberData?.name && "account"}
              isActive={activeItemIndex == 1 || teamMemberData}
              onPress={() =>
                isSelectableItemPressable &&
                navigation.navigate("MemberSelection", {
                  setItemSelected: (e) => setTeamMemberData(e),
                  itemSelected: teamMemberData,
                  batonId: batonId,
                })
              }
            >
              {teamMemberData ? teamMemberData?.name : "Select a team member"}
            </Selectable>

            <Selectable
              bgColor={colors.azure}
              icon={({ size, color }) => (
                <AntDesign name="calendar" size={size} color={color} />
              )}
              isEditable={editableFields?.date && dateData != "Set a deadline"}
              isActive={activeItemIndex == 2 || dateData}
              onPress={() =>
                isSelectableItemPressable &&
                navigation.navigate("DateSelection", {
                  setSelectedItem: (e) => setDateData(e),
                  selectedItem: dateData,
                })
              }
            >
              {dateData ? dateData : "Set a deadline"}
            </Selectable>

            <Selectable
              isEditable={editableFields?.budget}
              bgColor={colors.azure}
              icon={({ color, size }) => (
                <FontAwesome name="dollar" size={size} color={color} />
              )}
              onPress={() =>
                isSelectableItemPressable &&
                navigation.navigate("BudgetSelection", {
                  setItemSelected: (e) => setBudgetData(e),
                  itemSelected: budgetData,
                })
              }
              isActive={activeItemIndex == 3 || budgetData}
            >
              {budgetData
                ? `${budgetData != "N/A" ? "$" : ""}${budgetData}`
                : "Set a budget"}
            </Selectable>
            {console.log(filesList?.length)}
            <Selectable
              isEditable={editableFields?.files}
              bgColor={colors.azure}
              icon="attachment"
              isActive={activeItemIndex == 4 || filesList || id}
              onPress={() =>
                !isDeleted &&
                navigation.navigate("FileSelection", {
                  setItemSelected: (e) => setFilesList(e),
                  itemSelected: filesList,
                  batonId: batonId,
                })
              }
            >
              {filesList
                ? filesList.length + " files attached"
                : "Attach a file"}
            </Selectable>

            <Selectable
              isEditable={editableFields?.postUpdate}
              bgColor={colors.azure}
              icon="post"
              onPress={() =>
                !isDeleted &&
                navigation.navigate("PostUpdateSelection", {
                  setItemSelected: (e) => setPostUpdateData(e),
                  itemSelected: postUpdateData,
                  batonId: batonId,
                })
              }
              isActive={activeItemIndex == 5 || postUpdateData}
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
                    disabled={
                      !(
                        dateData != null &&
                        budgetData != null &&
                        teamMemberData != null &&
                        title != "" &&
                        description != ""
                      )
                    }
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});
