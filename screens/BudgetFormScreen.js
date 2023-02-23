import React from "react";
import { BudgetComponent, FormScreen } from "../components";

export default function BudgetFormScreen({ route, navigation }) {
  const { itemSelected, setItemSelected } = route.params;
  return (
    <FormScreen title="Set a budget" navigation={navigation}>
      <BudgetComponent
        setItemSelected={setItemSelected}
        itemSelected={itemSelected}
        closeScreen={() => navigation.goBack()}
      />
    </FormScreen>
  );
}
