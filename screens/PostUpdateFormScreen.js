import React from "react";
import { FormScreen, PostUpdateComponent } from "../components";

export default function PostUpdateFormScreen({ route, navigation }) {
  const { itemSelected, setItemSelected, batonId } = route.params;
  return (
    <FormScreen title="Post an update" navigation={navigation}>
      <PostUpdateComponent
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
        closeScreen={() => navigation.goBack()}
        batonId={batonId}
      />
    </FormScreen>
  );
}
