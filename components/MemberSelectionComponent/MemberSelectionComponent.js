import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../utilities/colors";
import { widths } from "../../utilities/sizes";
import {
  handleAddSystemUserToMember,
  handleSignUp,
  handleAddTeamMemberByInvite,
  handleUpdateTeamMemberStatus,
} from "../../services";
import Selectable from "../Selectable/Selectable";
import TealButton from "../TealButton/TealButton";
import { useUser } from "../../hooks/useContext";
import { useToast } from "react-native-toast-notifications";

export default function MemberSelectionComponent({
  setSelectedItem,
  closeScreen,
  members,
  formMode = true,
}) {
  const [member, setMember] = useState({ text: "", image: null });
  const [membersList, setMembersList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteMode, setInviteMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [docId, setDocId] = useState("");

  const { isLogin } = useUser();
  const toast = useToast();

  useEffect(() => {
    return () => {
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
    };
  }, [members, searchText]);

  const handleDeleteUser = () => {
    setLoading(true);
    handleUpdateTeamMemberStatus(docId, "deleted")
      .then(() => {
        toast.show(`Member deleted`, {
          type: "success",
        });
        setModalVisible(false);
      })
      .catch((ex) => {
        console.log(ex);
        toast.show(`Failed to delete ${member.text}`, {
          type: "danger",
        });
      })
      .finally(() => setLoading(false));
  };

  const handleInviteUser = () => {
    setLoading(true);
    handleSignUp(inviteEmail, null, true)
      .then((user) => {
        // console.log(user);
        handleAddTeamMemberByInvite({
          receiverId: user.uid,
          receiverEmail: user.email,
          status: "pending",
          inviteBy: isLogin.uid,
          name: inviteName,
        })
          .then(() => {
            toast.show(`An invite has been sent to ${user.email}`, {
              type: "success",
            });

            if (formMode) {
              // !
              setSelectedItem({
                text: inviteName,
                inviteBy: isLogin.uid,
                name: inviteName,
              });
              setModalVisible(false);
              closeScreen();
            }
          })
          .finally(() => setLoading(false));
      })
      .catch((ex) => {
        if (ex.message == "auth/email-already-in-use") {
          handleAddSystemUserToMember({
            email: inviteEmail,
            inviteBy: isLogin.uid,
            name: inviteName,
          })
            .then(() => {
              toast.show(`${inviteEmail} added as a member`, {
                type: "success",
              });
              setModalVisible(false);
            })
            .catch((ex) => {
              throw new Error(ex);
            })
            .finally(() => setLoading(false));
        } else {
          console.log(ex);
          toast.show("Failed to add member:", { type: "danger" });
          setLoading(false);
        }
      });
  };

  return (
    <View style={{ padding: 25 }}>
      {/* Delete Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: widths.width70p,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                {inviteMode && "Invite a user"}
              </Text>
              <AntDesign
                name="closecircleo"
                size={24}
                color="black"
                style={{ alignSelf: "flex-end" }}
                onPress={() => setModalVisible(false)}
              />
            </View>

            <View
              style={{
                marginTop: 20,
                width: widths.width70p,
              }}
            >
              {inviteMode ? (
                <>
                  <TextInput
                    placeholder="Email"
                    onChangeText={(e) => setInviteEmail(e)}
                    mode="outlined"
                    value={inviteEmail}
                    style={{ height: 45 }}
                  />
                  <TextInput
                    placeholder="Name"
                    onChangeText={(e) => setInviteName(e)}
                    mode="outlined"
                    value={inviteName}
                    style={{ height: 45, marginTop: 15 }}
                  />
                  {loading ? (
                    <ActivityIndicator style={styles.centerMe} />
                  ) : (
                    <Button
                      mode="contained"
                      onPress={handleInviteUser}
                      style={[
                        styles.centerMe,
                        {
                          width: widths.width50p,
                        },
                      ]}
                    >
                      Submit
                    </Button>
                  )}
                </>
              ) : loading ? (
                <ActivityIndicator />
              ) : (
                <Button
                  mode="contained"
                  onPress={handleDeleteUser}
                  style={{
                    width: widths.width50p,
                    alignSelf: "center",
                    marginTop: 15,
                  }}
                >
                  Delete
                </Button>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <TextInput
        placeholder="Search by name or email"
        onChangeText={(e) => setSearchText(e)}
        mode="outlined"
        value={searchText}
      />
      <Selectable
        icon={<AntDesign name="plus" size={24} color={colors.teal100} />}
        isActive={false}
        bgColor={colors.cgLight95}
        style={{ marginTop: 10 }}
        onPress={() => {
          setInviteMode(true);
          setModalVisible(true);
        }}
      >
        <Text>Invite team member by email</Text>
      </Selectable>

      {/* Members List */}
      <ScrollView style={{ marginTop: 5 }} showsVerticalScrollIndicator={false}>
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
            onPress={() => {
              if (!formMode) {
                setInviteMode(false);
                setModalVisible(true);
                setDocId(e.docId);
              } else {
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
                });
              }
            }}
            bgColor={colors.tealLight90}
            isActive={formMode ? e.name == member.text : false}
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
        <View style={{ height: formMode ? 150 : 250 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centerMe: {
    alignSelf: "center",
    marginTop: 15,
  },
});
