import React from "react";
import { FileAttachmentComponent, FormScreen } from "../components";

export default function FileFormScreen({ route, navigation }) {
  const { selectedItem, setSelectedItem, batonId } = route.params;
  // console.log(batonId);
  return (
    <FormScreen title="Attach a file" navigation={navigation}>
      <FileAttachmentComponent
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        closeScreen={() => navigation.goBack()}
        batonId={batonId}
      />
    </FormScreen>
  );
}
