import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import * as Clipboard from "expo-clipboard";

import { colors } from "../utilities/colors";
import { heights, widths } from "../utilities/sizes";
import {
  handleSendInviteToMember,
  handleAddTeamMember,
  handleDeleteTeamMember,
  handleUpdateTeamMemberStatus,
} from "../services";
import Selectable from "../components/Selectable/Selectable";
import TealButton from "../components/TealButton/TealButton";
import ColoredText from "../components/ColoredText/ColoredText";
import AppBarView from "../components/AppBarView/AppBarView";

import { useUser } from "../hooks/useContext";
import { useToast } from "react-native-toast-notifications";
import { v4 } from "uuid";

export default function TeamMembersScreen({ navigation, route }) {
  const { teamMembers, isLogin } = useUser();
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInviteSent, setIsInviteSent] = useState(false);
  const [inviteSentTo, setInviteSentTo] = useState("");
  const [inviteId, setInviteId] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);
  const [currentTabItem, setCurrentTabItem] = useState(1);
  const [deleteMember, setDeleteMember] = useState(null);

  const toast = useToast();
  let schema = yup.object().shape({
    email: yup.string().email().required().label("Email"),
    firstName: yup.string().required().label("First Name"),
    lastName: yup.string().required().label("Last Name"),
    confirmemail: yup
      .string()
      .required()
      .oneOf([yup.ref("email"), null], "Emails does not match!"),
  });
  // console.log("teamMembers", teamMembers);

  const copyToClipboard = async (string) => {
    await Clipboard.setStringAsync(string);
  };

  const handleOk = () => {
    console.log("handleOk");
    setIsModalVisible(false);
    setIsInviteSent(false);
  };

  const handleRemoveOk = () => {
    console.log("handleRemoveOk");
    setIsRemoveModalVisible(false);
  };

  const showModal = () => {
    console.log("showModaal");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log("handleCancel");
    setIsModalVisible(false);
    setIsInviteSent(false);
  };

  const handleDeleteUser = () => {
    // console.log(deleteMember);
    setRemoveLoading(true);
    handleUpdateTeamMemberStatus(deleteMember.docId, "deleted")
      .then(() => {
        toast.show(`Member deleted`, {
          type: "success",
          style: { height: 50 },
        });
        setIsRemoveModalVisible(false);
        setRemoveLoading(false);
        setDeleteMember(null);
      })
      .catch((ex) => {
        console.log(ex);
        toast.show(`Failed to delete the member`, {
          type: "danger",
          style: { height: 50 },
        });
      })
      .finally(() => setRemoveLoading(false));
  };

  const handleAddMemberByEmailSubmit = (values) => {
    // 1. Check if user is already a member of the team, then show error
    // 2. if user is not a member of the team, then send mail

    console.log("handleAddMemberByEmailSubmit");
    if (values.email?.toLowerCase() === isLogin.email?.toLowerCase()) return;
    if (
      teamMembers?.filter(
        (item) =>
          item.receiverEmail?.toLowerCase() == values.email?.toLowerCase()
      ).length > 0
    ) {
      toast.show("User already a member of the team", { type: "error" });
    } else {
      setLoading(true);
      let invId = v4();
      setInviteId(invId);
      let payload = {
        receiverId: "temp",
        receiverEmail: values.email?.toLowerCase(),
        status: "pending",
        inviteBy: isLogin.uid,
        batonId: null,
        name: values.firstName + " " + values.lastName,
        inviteId: invId,
        inviteType: "email",
        timeStamp: new Date().getTime(),
      };

      var templateParams = {
        to_name: payload.name,
        to_email: payload.receiverEmail?.toLowerCase(),
        url: `https://dasmooth-project.web.app/signup/${invId}`,
      };

      var raw = {
        service_id: "service_sqizzqr",
        template_id: "template_7rhfybc",
        user_id: "l-LW9FV7je0GRpUsN",
        accessToken: "DcsFelftU93sq2CbP08Rq",
        template_params: {
          ...templateParams,
        },
      };

      console.log("sending email", raw);
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        body: JSON.stringify(raw),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const text = await response.text();
          console.log(text);
          console.log("SUCCESS!", response.status, text);
          if (response.status != 200) throw new Error("Failed to send email");
        })
        .then((response) => {
          setInviteSentTo("");
          setIsInviteSent(false);
          // sent email to the user and then add to database
          handleSendInviteToMember(payload)
            .then(() => {
              // add member to team with pending status
              payload = {
                receiverId: "",
                receiverEmail: values.email,
                status: "pending",
                inviteBy: isLogin.uid,
                name: values.firstName + " " + values.lastName,
              };
              handleAddTeamMember(invId, payload)
                .then(() => {
                  console.log("Invite sent");
                  setIsInviteSent(true);
                  setInviteSentTo(values.email?.toLowerCase());
                })
                .finally(() => setLoading(false));
            })

            .catch((ex) => {
              console.log(ex);
              setLoading(false);
              toast.show(ex.message, { type: "danger" });
            });
        })
        .catch((ex) => {
          console.log(ex);
          setLoading(false);
          toast.show(ex.message, { type: "danger" });
        });
    }
  };

  const handleCreateShareableLink = () => {
    console.log("send invite by link");
    let invId = v4();
    // console.log(invId);
    setInviteId(invId);

    let payload = {
      receiverId: null,
      receiverEmail: null,
      status: "pending",
      inviteBy: isLogin.uid,
      batonId: null,
      name: "Waiting for member to join",
      inviteId: invId,
      inviteType: "link",
      timeStamp: new Date().getTime(),
    };
    handleSendInviteToMember(payload)
      .then(() => {
        console.log("invite sent", payload);
      })
      .catch((ex) => {
        toast.show(ex.message, { type: "error" });
      });
  };

  const renderInviteForm = () => {
    return (
      <ScrollView
        style={{
          width: widths.width80p,
          marginTop: 20,
        }}
      >
        {isInviteSent == true && (
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: colors.mosque,
              paddingLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>
              Invite sent to {inviteSentTo}
            </Text>
          </View>
        )}
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            confirmemail: "",
          }}
          onSubmit={(values) => handleAddMemberByEmailSubmit(values)}
          validationSchema={schema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextInput
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  mode="outlined"
                  value={values.firstName}
                  style={{ height: 45, width: "48%" }}
                />

                <TextInput
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                  mode="outlined"
                  value={values.lastName}
                  style={{ height: 45, width: "48%" }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ColoredText
                  color="red"
                  visible={errors.firstName}
                  fontSize={12}
                >
                  {errors.firstName}
                </ColoredText>

                <ColoredText
                  color="red"
                  visible={errors.lastName}
                  fontSize={12}
                >
                  {errors.lastName}
                </ColoredText>
              </View>

              <TextInput
                placeholder="Email address (required)"
                onChangeText={handleChange("email")}
                mode="outlined"
                value={values.email}
                style={{ height: 45 }}
              />
              <ColoredText color="red" visible={errors.email} fontSize={12}>
                {errors.email}
              </ColoredText>

              <TextInput
                placeholder="Confirm email (required)"
                onChangeText={handleChange("confirmemail")}
                mode="outlined"
                value={values.confirmemail}
                style={{ height: 45 }}
              />
              <ColoredText
                color="red"
                visible={errors.confirmemail}
                fontSize={12}
              >
                {errors.confirmemail}
              </ColoredText>

              {loading ? (
                <ActivityIndicator style={styles.centerMe} />
              ) : (
                <>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={[
                      styles.centerMe,
                      {
                        width: widths.width80p,
                      },
                    ]}
                    disabled={isInviteSent}
                  >
                    SEND INVITE
                  </Button>

                  <Button
                    mode="outlined"
                    onPress={handleOk}
                    style={[
                      styles.centerMe,
                      {
                        width: widths.width80p,
                      },
                    ]}
                  >
                    CANCEL
                  </Button>
                </>
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  };

  const renderShareLink = () => {
    return (
      <View
        style={{
          width: widths.width80p,
          marginTop: 20,
        }}
      >
        {showLink ? (
          <>
            <TextInput
              placeholder="First Name"
              mode="outlined"
              value={`https://dasmooth-project.web.app/signup/${inviteId}`}
              style={{ height: 45 }}
              editable={false}
            />
            <Button
              mode="contained"
              style={{ marginTop: 15 }}
              onPress={() => {
                setLinkCopied(true);
                copyToClipboard(
                  `https://dasmooth-project.web.app/signup/${inviteId}`
                );
              }}
            >
              {!linkCopied ? "Copy" : "Copied"}
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            style={{ marginTop: 15 }}
            onPress={() => {
              setLinkCopied(false);
              copyToClipboard("");
              handleCreateShareableLink();
              setShowLink(true);
            }}
          >
            Create Shareble Link
          </Button>
        )}
      </View>
    );
  };

  const items = [
    {
      key: "1",
      label: `Invite by email`,
      children: renderInviteForm(),
    },
    {
      key: "2",
      label: `Invite by share link`,
      children: renderShareLink(),
    },
  ];

  useEffect(() => {
    let data = teamMembers;

    // console.log(searchText);
    // console.log(data);
    // return;
    if (searchText == "") {
      setMembers(data);
    } else {
      data = teamMembers.filter(
        (e) =>
          e.receiverEmail.toLowerCase().includes(searchText.toLowerCase()) ||
          e.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setMembers(data);
    }
  }, [teamMembers, searchText]);

  return (
    <AppBarView navigation={navigation} route={route}>
      <View style={{ marginLeft: 25, marginTop: 25 }}>
        <Text style={{ fontSize: 24, color: colors.textColor }}>
          Team Members
        </Text>
      </View>

      {/* ------------------------------ */}
      <View style={{ padding: 25 }}>
        {/* Ivite Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleOk}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: widths.width80p,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Invite a new team member
                </Text>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={{ alignSelf: "flex-end" }}
                  onPress={handleOk}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: widths.width80p,
                }}
              >
                <Text>
                  Start collabrating with your team member by sending an invite
                  to your Baton.
                </Text>
                {/* Taab Item View */}
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  {items.map((item, index) => (
                    <Pressable
                      onPress={() => {
                        setCurrentTabItem(item.key);
                        if (item.key == 2) setShowLink(false);
                      }}
                      style={styles.tabItem}
                      key={item.key}
                    >
                      <Text
                        style={[
                          styles.tabItemText,
                          {
                            color:
                              currentTabItem == item.key
                                ? colors.mosque
                                : "black",
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {currentTabItem == item.key && (
                        <View
                          style={{
                            height: 2,
                            backgroundColor: colors.mosque,
                            width: "100%",
                            marginTop: 5,
                          }}
                        />
                      )}
                    </Pressable>
                  ))}
                </View>

                {currentTabItem == 1 ? renderInviteForm() : renderShareLink()}
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isRemoveModalVisible}
          onRequestClose={handleRemoveOk}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: widths.width80p,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "600" }}>Confirm</Text>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={{ alignSelf: "flex-end" }}
                  onPress={handleRemoveOk}
                />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: widths.width80p,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 16, textAlign: "justify" }}>
                    Are you sure you want to delete this team member from your
                    list of team members. This process cannot be undone ?
                  </Text>

                  {removeLoading ? (
                    <ActivityIndicator
                      style={{ marginTop: 20 }}
                      size={26}
                      color={colors.teal100}
                    />
                  ) : (
                    <>
                      <Button
                        mode="contained"
                        onPress={handleDeleteUser}
                        style={{
                          width: widths.width80p,
                          alignSelf: "center",
                          marginTop: 25,
                        }}
                      >
                        REMOVE TEAM MEMBER
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={handleRemoveOk}
                        style={{
                          width: widths.width80p,
                          alignSelf: "center",
                          marginTop: 10,
                        }}
                      >
                        CANCEL
                      </Button>
                    </>
                  )}
                </View>
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
          icon="plus"
          iconBgColor="transparent"
          iconColor={colors.mosque}
          isActive={false}
          style={{ marginTop: 10 }}
          onPress={showModal}
        >
          <Text>Invite team member by email</Text>
        </Selectable>

        {/* Members List */}
        <ScrollView
          style={{
            marginTop: 5,
            height: heights.height55p,
          }}
          showsVerticalScrollIndicator={false}
        >
          {members.map((e, index) => (
            <Selectable
              key={index}
              text={e.name.substring(0, 2).toUpperCase()}
              onPress={() => {
                setDeleteMember(e);
                setIsRemoveModalVisible(true);
              }}
              email={e.receiverEmail}
              isActive={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: widths.width60p,
                }}
              >
                <View>
                  <Text style={{ color: colors.mosque }}>{e.name}</Text>
                  <Text style={{ color: colors.mosque }}>
                    {e.receiverEmail}
                  </Text>
                </View>
                <Text>
                  {`${e.status?.charAt(0)?.toUpperCase() + e.status?.slice(1)}`}
                </Text>
              </View>
            </Selectable>
          ))}
        </ScrollView>
      </View>
    </AppBarView>
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
    padding: 25,
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
  tabItem: {
    marginRight: 20,
  },
  tabItemText: { fontWeight: "600" },
});
