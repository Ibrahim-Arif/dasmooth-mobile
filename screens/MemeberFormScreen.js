import React from "react";
import { FormScreen, MemberSelectionComponent } from "../components";
import { useUser } from "../hooks/useContext";

export default function MemeberFormScreen({ route, navigation }) {
  const { setSelectedItem } = route.params;
  const { teamMembers } = useUser();
  return (
    <FormScreen title="Select a team member" navigation={navigation}>
      <MemberSelectionComponent
        setSelectedItem={setSelectedItem}
        closeScreen={() => navigation.goBack()}
        members={teamMembers}
      />
    </FormScreen>
  );
}
