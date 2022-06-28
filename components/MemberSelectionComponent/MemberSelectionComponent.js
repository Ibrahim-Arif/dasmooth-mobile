import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { colors } from "../../utilities/colors";
import Selectable from "../Selectable/Selectable";
import TealButton from "../TealButton/TealButton";

export default function MemberSelectionComponent({
  setSelectedItem,
  closeScreen,
  members,
  formMode = true,
}) {
  const [member, setMember] = useState({ text: "", image: null });
  const [membersList, setMembersList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let data = members;

    if (searchText == "") {
      setMembersList(data);
    } else {
      data = members.filter(
        (e) =>
          e.receiverEmail.toLowerCase().includes(searchText.toLowerCase()) ||
          e.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setMembersList(data);
    }
  }, [members, searchText]);

  return (
    <View style={{ padding: 25 }}>
      <TextInput
        style={{ marginTop: 25 }}
        placeholder="Search by name or email"
        onChangeText={(e) => setSearchText(e)}
        mode="outlined"
        value={searchText}
      />
      <ScrollView
        style={{ marginTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {membersList.map((e, index) => (
          <Selectable
            key={index}
            icon={
              // e.photoURL != undefined ? (
              //   <Avatar.Image
              //     source={{
              //       uri: e.photoURL,
              //     }}
              //     size={36}
              //     style={{ overflow: "hidden" }}
              //   />
              // ) : (
              <Avatar.Text
                size={36}
                style={{
                  backgroundColor:
                    e.name == member.text ? "white" : colors.teal100,
                  color: e.name != member.text ? "white" : colors.teal100,
                }}
                label={e.name.substring(0, 2).toUpperCase()}
              />
              // )
            }
            onPress={() =>
              setMember({
                text: e.name,
                icon: (
                  <Avatar.Text
                    size={36}
                    label={e.name.substring(0, 2).toUpperCase()}
                    style={{
                      backgroundColor:
                        e.name == member.text ? "white" : colors.teal100,
                      color: e.name != member.text ? "white" : colors.teal100,
                    }}
                  />
                ),
                memberId: e.receiverId,
              })
            }
            bgColor={colors.tealLight90}
            isActive={e.name == member.text}
          >
            {e.name}
          </Selectable>
        ))}
        {formMode && (
          <View style={{ marginTop: 15 }}>
            <TealButton
              text="SELECT MEMBER"
              onPress={() => {
                if (member.text != "") setSelectedItem(member);
                closeScreen();
              }}
            />
          </View>
        )}
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
}
