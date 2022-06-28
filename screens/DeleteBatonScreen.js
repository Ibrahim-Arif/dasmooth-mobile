import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AppBarView, BatonAccordian } from "../components";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";
import { filterBatonsData } from "../utilities/filterBatonsData";

export default function DeleteBatonScreen({ navigation }) {
  const { batonsData, isLogin } = useUser();
  const [deletedBatons, setDeletedBatons] = useState([]);

  useEffect(() => {
    let deleted = filterBatonsData(batonsData, "deleted", isLogin.uid);
    setDeletedBatons(deleted);
  }, [batonsData]);

  return (
    <AppBarView navigation={navigation}>
      <ScrollView style={{ marginTop: 15, paddingLeft: 15, paddingRight: 15 }}>
        <BatonAccordian
          title={"Deleted Batons"}
          bgColor="white"
          color={colors.danger}
          listItems={deletedBatons}
        />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </AppBarView>
  );
}
