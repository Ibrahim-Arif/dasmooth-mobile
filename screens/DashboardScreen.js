import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { Appbar } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import { BatonAccordian, TealButton } from "../components";
import { colors } from "../utilities/colors";
import { logo } from "../assets";
import { useUser } from "../hooks/useContext";
import { filterBatonsData } from "../utilities/filterBatonsData";
import { batonsList } from "../utilities/batonsList";

export default function DashboardScreen({ navigation }) {
  const {
    batonsData,
    batons,
    setBatons,
    isLogin,
    setBatonsData,
    permanentData,
  } = useUser();

  const [isSearchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [PendingBatons, setPendingBatons] = useState([]);
  const [PassedBatons, setPassedBatons] = useState([]);
  const [ReceivedBatons, setReceivedBatons] = useState([]);
  const [DeclinedBatons, setDeclinedBatons] = useState([]);
  const [AcceptedBatons, setAcceptedBatons] = useState([]);
  const [CompleteBatons, setCompleteBatons] = useState([]);
  const [activeBatons, setActiveBatons] = useState(Object.values(batons));

  const statuses = ["pending", "passed", "received", "declined", "complete"];

  const filterBatons = (batonData, batonName) => {
    // console.log(batonsList)
    if (batonData.length == 0) {
      // console.log(`removing the ${batonName} btaon back in array`);
      let temp = batons;
      delete temp[batonName];
      setBatons(temp);
      setActiveBatons(Object.values(temp));
    } else if (batonData.length > 0) {
      // console.log(`adding the ${batonName} btaon back in array`);
      let temp = batons;
      temp[batonName] = batonsList[batonName];
      // console.log(batonsList)
      setBatons(temp);
      temp = Object.values(temp);
      setActiveBatons(Object.values(temp));
    }
  };

  useEffect(() => {
    console.log("DashBoardView");
    // batonsData.forEach((e) => console.log(e.title, "|", e.docId));
    // console.log(batonsData);
    let pending = filterBatonsData(batonsData, "pending", isLogin.uid);
    filterBatons(pending, "pending");
    setPendingBatons(pending);

    let passed = filterBatonsData(batonsData, "passed", isLogin.uid);
    filterBatons(passed, "passed");
    setPassedBatons(passed);

    let received = filterBatonsData(batonsData, "received", isLogin.uid);
    filterBatons(received, "received");
    setReceivedBatons(received);

    let accepted = filterBatonsData(batonsData, "accepted", isLogin.uid);
    filterBatons(accepted, "accepted");
    setDeclinedBatons(accepted);

    let declined = filterBatonsData(batonsData, "declined", isLogin.uid);
    filterBatons(declined, "declined");
    setDeclinedBatons(declined);

    let complete = filterBatonsData(batonsData, "complete");
    // console.log("coomp", complete);
    filterBatons(complete, "complete");
    setCompleteBatons(complete);

    // console.log(batons);
  }, [batonsData]);

  const getBaton = {
    PendingBatons,
    PassedBatons,
    ReceivedBatons,
    DeclinedBatons,
    AcceptedBatons,
    CompleteBatons,
  };
  const onChangeSearch = (query) => setSearchQuery(query);

  useEffect(() => {
    if (searchQuery == "") {
      setBatonsData(permanentData);
    } else {
      let temp = [...permanentData];
      temp = temp.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.memberName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setBatonsData(temp);
    }
  }, [searchQuery]);

  const renderItem = ({ item, drag, isActive }, data) => (
    <ScaleDecorator>
      <View style={{ marginTop: 15 }}>
        <BatonAccordian
          title={item.title}
          bgColor={item.bgColor}
          color={item.borderColor}
          drag={drag}
          listItems={data}
        />
      </View>
    </ScaleDecorator>
  );

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Appbar style={{ justifyContent: "space-between" }}>
          <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />

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
            <View>
              <Image
                source={logo}
                style={{
                  height: 45,
                  resizeMode: "contain",
                }}
              />
            </View>
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
            data={activeBatons}
            onDragEnd={({ data }) => setBatons(data)}
            keyExtractor={(item) => item.title}
            renderItem={({ item, drag, isActive }) =>
              renderItem(
                { item, drag, isActive },
                getBaton[item.title.replace(/\s+/g, "")]
              )
            }
          />
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === "android" ? 24 : 0,
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
