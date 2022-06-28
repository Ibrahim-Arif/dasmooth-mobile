import React from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Avatar, Title, Drawer as PaperDrawer } from "react-native-paper";
import {
  DeleteBatonScreen,
  NotificationScreen,
  ProfileSettingScreen,
  TeamMembersScreen,
} from "../screens";
import { colors } from "../utilities/colors";
import { DashboardNavigaiton } from "./DashboardNavigation";
import { useUser } from "../hooks/useContext";
import { getAuth } from "firebase/auth";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { setIsLogin, notifications } = useUser();
  const auth = getAuth();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
            size={80}
          />
          <Title style={styles.title}>User Name</Title>
        </View>
        <PaperDrawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, focused, size }) => (
              <MaterialIcons
                name="dashboard"
                size={size}
                color={colors.teal100}
              />
            )}
            label="Dashboard"
            onPress={() => {
              props.navigation.navigate("Dashboard");
            }}
          />

          <DrawerItem
            icon={({ color, focused, size }) =>
              notifications.length > 0 ? (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    backgroundColor: colors.danger,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>{notifications.length}</Text>
                </View>
              ) : (
                <AntDesign name="bells" size={size} color={colors.teal100} />
              )
            }
            label="Notification"
            onPress={() => {
              props.navigation.navigate("Notification");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="setting" size={size} color={colors.teal100} />
            )}
            label="Profile Settings"
            onPress={() => {
              props.navigation.navigate("ProfileSettings");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="team" size={size} color={colors.teal100} />
            )}
            label="Team Members"
            onPress={() => {
              props.navigation.navigate("TeamMembers");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="delete" size={size} color={colors.teal100} />
            )}
            label="Delete Batons"
            onPress={() => {
              props.navigation.navigate("DeleteBatons");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="logout" size={size} color={colors.teal100} />
            )}
            label="Logout"
            onPress={() => {
              auth.signOut();
              setIsLogin(false);
              // props.navigation.navigate("SignIn");
            }}
          />
        </PaperDrawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        drawerActiveTintColor: colors.teal100,
        title: "LOGO",
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardNavigaiton} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
      <Drawer.Screen name="ProfileSettings" component={ProfileSettingScreen} />
      <Drawer.Screen name="TeamMembers" component={TeamMembersScreen} />
      <Drawer.Screen name="DeleteBatons" component={DeleteBatonScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  drawerSection: {
    marginTop: 15,
  },
});
