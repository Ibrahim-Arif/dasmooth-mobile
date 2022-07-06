import React from "react";
import { FormScreen, PostUpdateComponent } from "../components";

export default function PostUpdateFormScreen({ route, navigation }) {
  const { selectedItem, setSelectedItem, batonId } = route.params;
  return (
    <FormScreen title="Post an update" navigation={navigation}>
      <PostUpdateComponent
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        closeScreen={() => navigation.goBack()}
        batonId={batonId}
      />
    </FormScreen>
  );
}
