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
  const [batons, setBatons] = useState([
    {
      title: "Pending Batons",
      borderColor: null,
      bgColor: null,
    },
    {
      title: "Passed Batons",
      borderColor: "#EFB029",
      bgColor: "#FDF7E6",
    },
    {
      title: "Received Batons",
      borderColor: "#8217B1",
      bgColor: "#F7EFFD",
    },
    {
      title: "Accepted Batons",
      borderColor: "#409000",
      bgColor: "#F4FDF2",
    },
    {
      title: "Complete Batons",
      borderColor: "#196DB2",
      bgColor: "#F2F8FB",
    },
    {
      title: "Declined Batons",
      borderColor: "#EA4400",
      bgColor: "#FDEEE7",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
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
              text="Create new baton"
              icon={() => <Entypo name="plus" size={24} color="white" />}
              style={{ width: 220, backgroundColor: colors.tealDark30 }}
              onPress={() => {
                navigation.navigate("BatonForm");
              }}
            />
          </View>
          {/* Batons View */}
          {batons.map((e) => (
            <View style={{ marginTop: 15 }}>
              <BatonAccordian
                title={`${e.title} (0)`}
                bgColor={e.bgColor}
                color={e.borderColor}
              />
            </View>
          ))}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 24 : 0,
  },
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
