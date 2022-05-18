import React from "react";
import { DateTimeComponent, FormScreen } from "../components";

export default function DateTimeFormScreen({ route, navigation }) {
  const { selectedItem, setSelectedItem } = route.params;
  return (
    <FormScreen title="Set a deadline" navigation={navigation}>
      <DateTimeComponent
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        closeScreen={() => navigation.goBack()}
      />
    </FormScreen>
  );
}
