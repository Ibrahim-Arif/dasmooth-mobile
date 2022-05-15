import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, SafeAreaView } from "react-native";
import { Appbar, Avatar, IconButton } from "react-native-paper";
import { Octicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import TealButton from "../components/TealButton/TealButton";
import BatonAccordian from "../components/BatonAccordian/BatonAccordian";
import { colors } from "../utilities/colors";
import Selectable from "../components/Selectable/Selectable";

export default function DashboardScreen({ navigation }) {
  const [mode, setMode] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
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
      {mode === 0 ? (
        <ScrollView style={{ flex: 1, padding: 25 }}>
          <Text style={{ fontSize: 24 }}>Dashboard</Text>
          <View style={{ marginTop: 15 }}>
            <TealButton
              text="Create"
              icon={() => <Entypo name="plus" size={24} color="white" />}
              style={{ width: 150 }}
              onPress={() => setMode(1)}
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
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <IconButton icon="arrow-left" onPress={() => setMode(0)} size={26} />
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ fontSize: 24 }}>Get new city permit</Text>
            <Selectable
              bgColor={colors.tealLight90}
              icon={
                <Avatar.Icon size={40} icon="person" />
                // <Avatar.Image
                //   size={24}
                //   source={{
                //     uri: "https://callstack.github.io/react-native-paper/screenshots/avatar-image.png",
                //   }}
                // />
              }
            >
              Select a member
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="calender" />}
            >
              Set a deadline
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="calender" />}
            >
              Set a budget
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="calender" />}
            >
              Attach a file
            </Selectable>
            <Selectable
              bgColor={colors.tealLight90}
              icon={<Avatar.Icon size={40} icon="calender" />}
            >
              Post an update
            </Selectable>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: Platform.OS === "android" ? 24 : 0 },
});
