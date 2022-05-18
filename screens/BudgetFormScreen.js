import React from "react";
import { BudgetComponent, FormScreen } from "../components";

export default function BudgetFormScreen({ route, navigation }) {
  const { selectedItem, setSelectedItem } = route.params;
  return (
    <FormScreen title="Set a budget" navigation={navigation}>
      <BudgetComponent
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        closeScreen={() => navigation.goBack()}
      />
    </FormScreen>
  );
}
