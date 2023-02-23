import React from "react";
import { FileAttachmentComponent, FormScreen } from "../components";

export default function FileFormScreen({ route, navigation }) {
  const { itemSelected, setItemSelected, batonId } = route.params;
  // console.log(batonId);
  return (
    <FormScreen title="Attach a file" navigation={navigation}>
      <FileAttachmentComponent
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
        closeScreen={() => navigation.goBack()}
        batonId={batonId}
      />
    </FormScreen>
  );
}
