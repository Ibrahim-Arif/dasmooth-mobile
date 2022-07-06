import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
import { AppBarView, TealButton } from "../components";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";

import { useUser } from "../hooks/useContext";
import { handleUserInformationUpdate } from "../services";
import { colors } from "../utilities/colors";
import { widths } from "../utilities/sizes";
import logResponse from "../utilities/logger";

export default function ProfileSettingScreen({ navigation }) {
  const { isLogin, setIsLogin, photoURL, setPhotoURL } = useUser();
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setEmail(isLogin.email);
    setName(isLogin.displayName);
    setProfileImage(photoURL);
  }, []);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // console.log(result);
    if (!result.cancelled) setProfileImage(result.uri);
  };

  const handleSaveClick = () => {
    setLoading(true);
    handleUserInformationUpdate(email, name, profileImage)
      .then((url) => {
        // console.log(isLogin);
        setPhotoURL(url);
        // console.log(url);
        toast.show("Profile updated successfully", {
          type: "success",
          style: { height: 50 },
        });
      })
      .catch((ex) => {
        logResponse("error", ex.message);
        toast.show("Profile update failed", {
          type: "danger",
          style: { height: 50 },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AppBarView navigation={navigation}>
      <View style={{ marginLeft: 25, marginTop: 25 }}>
        <Text style={{ fontSize: 24, color: colors.textColor }}>
          Profile Settings
        </Text>
      </View>

      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {profileImage != "" ? (
          <TouchableOpacity onPress={handleImageSelection}>
            <Image style={styles.imageViewer} source={{ uri: profileImage }} />
            <Feather
              name="edit"
              size={24}
              color="black"
              style={{
                position: "absolute",
                alignSelf: "center",
                top: "40%",
                opacity: 0.5,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleImageSelection}>
            <View style={styles.imagePicker}>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}

        <TextInput
          style={{ width: widths.width90p, marginTop: 50 }}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={{ width: widths.width90p, marginTop: 50 }}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <View style={{ marginTop: 50 }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TealButton text="Save" onPress={handleSaveClick} />
          )}
        </View>
      </ScrollView>
    </AppBarView>
  );
}

const styles = StyleSheet.create({
  formContainer: { margin: 25 },
  imageViewer: {
    width: widths.width40p,
    height: widths.width40p,
    alignSelf: "center",
  },
  imagePicker: {
    width: widths.width40p,
    height: widths.width40p,
    alignSelf: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
