import React from "react";
import { FormScreen, MemberSelectionComponent } from "../components";
import { useUser } from "../hooks/useContext";

export default function MemeberFormScreen({ route, navigation }) {
  const { itemSelected, setItemSelected, batonId } = route.params;
  console.log(route.params);
  const { teamMembers } = useUser();
  return (
    <FormScreen title="Select a team member" navigation={navigation}>
      <MemberSelectionComponent
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
        closeScreen={() => navigation.goBack()}
        members={teamMembers}
        batonId={batonId}
        navigation={navigation}
      />
    </FormScreen>
  );
}
