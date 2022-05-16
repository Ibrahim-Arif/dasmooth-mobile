import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import { Appbar, Avatar, IconButton } from "react-native-paper";
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

import {
  BatonAccordian,
  BudgetComponent,
  DateTimeComponent,
  FileAttachmentComponent,
  MemberSelectionComponent,
  PostUpdateComponent,
  Selectable,
  TealButton,
} from "../components";
import { colors } from "../utilities/colors";

export default function DashboardScreen({ navigation }) {
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
  const [dateData, setDateData] = useState("Set a deadline");
  const [budgetData, setBudgetData] = useState("Set a budget");
  const [postUpdateData, setPostUpdateData] = useState("");
  const [filesList, setFilesList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFormItemRender = (title, component, index) => {
    setActiveComponent(component);
    setActiveItemIndex(index);
    setActiveTitle(title);
    toggleModal();
  };
  return (
    <SafeAreaView style={styles.container}>
      {mode === 0 ? (
        <>
          <Appbar style={{ justifyContent: "space-between" }}>
            <Appbar.Action
              icon="menu"
              // {({ color, size }) => (
              //   <Octicons name="three-bars" size={size} color={color} />
              // )}
              onPress={() => navigation.openDrawer()}
            />
            <Appbar.Content title="LOGO" style={{ alignSelf: "center" }} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
          </Appbar>
          <ScrollView style={{ flex: 1, padding: 25 }}>
            <Text style={{ fontSize: 24 }}>Dashboard</Text>
            <View style={{ marginTop: 15 }}>
              <TealButton
                text="Create"
                icon={() => <Entypo name="plus" size={24} color="white" />}
                style={{ width: 150 }}
                onPress={() => {
                  flushData();
                  setMode(1);
                }}
              />
            </View>
            {/* Batons View */}
            <View style={{ marginTop: 15 }}>
              <BatonAccordian
                title="Pending Batons (1)"
                bgColor={colors.cgLight95}
              />
            </View>
          </ScrollView>
        </>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {/* Modal Section */}
          <Modal isVisible={isModalVisible}>
            <View style={{ backgroundColor: "white" }}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{activeTitle}</Text>
                <IconButton icon="close" onPress={toggleModal} />
              </View>
              {activeComponent}
            </View>
          </Modal>

          {/* Form Section */}
          <IconButton icon="arrow-left" onPress={() => setMode(0)} size={26} />
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 24 }}>Get new city permit</Text>
            <Selectable
              bgColor="white"
              textColor="black"
              style={{ marginTop: 25 }}
            >
              Some Description
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={teamMemberData.icon}
              isActive={teamMemberData.text != "Select a team member"}
              onPress={() =>
                handleFormItemRender(
                  "Select a team member",
                  <MemberSelectionComponent
                    setSelectedItem={setTeamMemberData}
                    closeModal={() => setModalVisible(false)}
                  />,
                  1
                )
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
                handleFormItemRender(
                  "Set a deadline",
                  <DateTimeComponent
                    selectedItem={dateData}
                    setSelectedItem={setDateData}
                    closeModal={() => setModalVisible(false)}
                  />,
                  2
                )
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
                handleFormItemRender(
                  "Set a budget",
                  <BudgetComponent
                    selectedItem={budgetData}
                    setSelectedItem={setBudgetData}
                    closeModal={() => setModalVisible(false)}
                  />,
                  3
                )
              }
              isActive={budgetData != "Set a budget"}
            >
              {budgetData}
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="attachment" />}
              isActive={filesList.length > 0}
              onPress={() =>
                handleFormItemRender(
                  "Attach a file",
                  <FileAttachmentComponent
                    selectedItem={filesList}
                    setSelectedItem={setFilesList}
                    closeModal={() => setModalVisible(false)}
                  />,
                  4
                )
              }
            >
              {filesList.length > 0
                ? `${filesList.length} files attached`
                : "Attach a file"}
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="post" />}
              onPress={() =>
                handleFormItemRender(
                  "Post an update",
                  <PostUpdateComponent
                    selectedItem={postUpdateData}
                    setSelectedItem={setPostUpdateData}
                    closeModal={() => setModalVisible(false)}
                  />,
                  5
                )
              }
              isActive={postUpdateData != ""}
            >
              Post an update
            </Selectable>
            <Selectable
              isActive={true}
              contentStyle={{ justifyContent: "center" }}
              // disabled={true}
              onPress={() => null}
            >
              Pass
            </Selectable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Platform.OS === "android" ? 24 : 0 },
  modalTitleContainer: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "grey",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginLeft: 15,
  },
});
