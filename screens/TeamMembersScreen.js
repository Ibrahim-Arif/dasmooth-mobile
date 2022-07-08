import React from "react";
import { Text, View } from "react-native";
import { AppBarView, MemberSelectionComponent } from "../components";
import { useUser } from "../hooks/useContext";
import { colors } from "../utilities/colors";

export default function TeamMembersScreen({ navigation, route }) {
  const { teamMembers } = useUser();

  return (
    <AppBarView navigation={navigation} route={route}>
      <View style={{ marginLeft: 25, marginTop: 25 }}>
        <Text style={{ fontSize: 24, color: colors.textColor }}>
          Team Members
        </Text>
      </View>
      <MemberSelectionComponent members={teamMembers} formMode={false} />
    </AppBarView>
  );
}
