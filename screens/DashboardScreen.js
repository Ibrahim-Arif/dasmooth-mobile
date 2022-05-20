import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableNativeFeedback,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { BatonAccordian, TealButton } from "../components";
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
  const [isSearchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const renderItem = ({ item, drag, isActive }) => (
    <ScaleDecorator>
      <View style={{ marginTop: 15 }}>
        <BatonAccordian
          title={`${item.title} (0)`}
          bgColor={item.bgColor}
          color={item.borderColor}
          drag={drag}
        />
      </View>
    </ScaleDecorator>
  );

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

          {isSearchMode ? (
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{
                alignSelf: "center",
                width: 250,
                height: 40,
                borderRadius: 20,
                elevation: 0,
              }}
            />
          ) : (
            <Appbar.Content title="LOGO" style={{ alignSelf: "center" }} />
          )}
          <Appbar.Action
            icon="magnify"
            onPress={() => setSearchMode(!isSearchMode)}
          />
        </Appbar>
        <View
          style={{ flex: 1, margin: 25, flexGrow: 1 }}
          // showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 24, color: colors.textColor }}>
            Dashboard
          </Text>
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

          <DraggableFlatList
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: 100 }}></View>}
            data={batons}
            onDragEnd={({ data }) => setBatons(data)}
            keyExtractor={(item) => item.title}
            renderItem={renderItem}
          />
        </View>
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
