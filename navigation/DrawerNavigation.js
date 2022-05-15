import React from "react";
import { StyleSheet, View } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Avatar, Title, Drawer as PaperDrawer } from "react-native-paper";
import { DashboardScreen, NotificationScreen } from "../screens";
import { colors } from "../utilities/colors";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
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
              <MaterialIcons name="dashboard" size={size} color={color} />
            )}
            label="Dashboard"
            onPress={() => {
              props.navigation.navigate("Dashboard");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="bells" size={size} color={color} />
            )}
            label="Notification"
            onPress={() => {
              props.navigation.navigate("Notification");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="setting" size={size} color={color} />
            )}
            label="Profile Settings"
            onPress={() => {
              props.navigation.navigate("ProfileSettings");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="team" size={size} color={color} />
            )}
            label="Team Members"
            onPress={() => {
              props.navigation.navigate("TeamMembers");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="delete" size={size} color={color} />
            )}
            label="Delete Batons"
            onPress={() => {
              props.navigation.navigate("DeleteBatons");
            }}
          />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="logout" size={size} color={color} />
            )}
            label="Logout"
            onPress={() => {
              props.navigation.navigate("SignIn");
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
      screenOptions={{ drawerActiveTintColor: colors.teal100 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Notification" component={NotificationScreen} />
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
