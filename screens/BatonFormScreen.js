import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import { Avatar, IconButton, TextInput } from "react-native-paper";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";

import {
  BudgetComponent,
  DateTimeComponent,
  FileAttachmentComponent,
  MemberSelectionComponent,
  PostUpdateComponent,
  Selectable,
} from "../components";
import { colors } from "../utilities/colors";

export default function DashboardScreen({ navigation }) {
  const [mode, setMode] = useState(0);
  const [activeTitle, setActiveTitle] = useState("Dummy Title");
  const [activeComponent, setActiveComponent] = useState(null);
  const [title, setTitle] = useState("");
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
          <Text style={{ fontSize: 24 }}>{title != "" ? title : "Blank"}</Text>
          <TextInput
            style={{ marginTop: 25 }}
            placeholder="Add Text"
            onChangeText={(e) => setTitle(e)}
            mode="outlined"
            value={title}
          />
          <Selectable
            style={{ marginTop: 25 }}
            bgColor={colors.tealLight90}
            icon={teamMemberData.icon}
            isActive={teamMemberData.text != "Select a team member"}
            onPress={() =>
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
            isActive={filesList.length > 0}
            onPress={() =>
              navigation.navigate("FileSelection", {
                setSelectedItem: (e) => setFilesList(e),
                selectedItem: filesList,
              })
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
              navigation.navigate("PostUpdateSelection", {
                setSelectedItem: (e) => setPostUpdateData(e),
                selectedItem: postUpdateData,
              })
            }
            isActive={postUpdateData != ""}
          >
            Post an update
          </Selectable>
          <Selectable
            isActive={true}
            contentStyle={{ justifyContent: "center" }}
            // disabled={true}
            onPress={() => navigation.navigate("DashboardMain")}
          >
            Pass
          </Selectable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Platform.OS === "android" ? 24 : 0 },
});
