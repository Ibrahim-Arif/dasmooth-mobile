import React, { useState } from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { colors } from "../../utilities/colors";
import Selectable from "../Selectable/Selectable";
import TealButton from "../TealButton/TealButton";

export default function MemberSelectionComponent({
  setSelectedItem,
  closeScreen,
}) {
  const [member, setMember] = useState({ text: "", image: null });
  const data = [
    {
      text: "Person 1",
      image:
        "https://i.pinimg.com/736x/6b/cb/e1/6bcbe10420ae10b82b550b3d4adeb13e--sunset-pictures-pretty-pictures.jpg",
    },
    {
      text: "Person 2",
      image: null,
    },
  ];
  return (
    <View style={{ padding: 25, alignItems: "center" }}>
      {data.map((e, index) => (
        <Selectable
          key={index}
          icon={
            e.image != null ? (
              <Avatar.Image
                source={{
                  uri: e.image,
                }}
                size={36}
                style={{ overflow: "hidden" }}
              />
            ) : (
              <Avatar.Text size={36}>{e.text}</Avatar.Text>
            )
          }
          onPress={() =>
            setMember({
              text: e.text,
              icon:
                e.image != null ? (
                  <Avatar.Image
                    source={{
                      uri: e.image,
                    }}
                    size={36}
                    style={{ overflow: "hidden" }}
                  />
                ) : (
                  <Avatar.Text size={36} label={e.text.charAt(0)} />
                ),
            })
          }
          bgColor={colors.tealLight90}
          isActive={e.text === member.text}
        >
          {e.text}
        </Selectable>
      ))}
      <View style={{ marginTop: 15 }}>
        <TealButton
          text="SELECT MEMBER"
          onPress={() => {
            if (member.text != "") setSelectedItem(member);
            closeScreen();
          }}
        />
      </View>
    </View>
  );
}
