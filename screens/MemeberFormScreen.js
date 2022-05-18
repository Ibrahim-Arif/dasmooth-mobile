import React from "react";
import { FormScreen, MemberSelectionComponent } from "../components";

export default function MemeberFormScreen({ route, navigation }) {
  const { setSelectedItem } = route.params;
  return (
    <FormScreen title="Select a team member" navigation={navigation}>
      <MemberSelectionComponent
        setSelectedItem={setSelectedItem}
        closeScreen={() => navigation.goBack()}
      />
    </FormScreen>
  );
}
