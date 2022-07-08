import React from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Avatar, Title, Drawer as PaperDrawer } from "react-native-paper";
import {
  NotificationScreen,
  ProfileSettingScreen,
  TeamMembersScreen,
} from "../screens";
import { colors } from "../utilities/colors";
import { DashboardNavigaiton } from "./DashboardNavigation";
import { useUser } from "../hooks/useContext";
import { getAuth } from "firebase/auth";
import { DeletedBatonsNavigation } from "./DeletedBatonsNavigation";

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const auth = getAuth();

  const { setIsLogin, isLogin, photoURL } = useUser();

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          {photoURL == null || photoURL == "" || photoURL.includes("blob") ? (
            <Avatar.Text
              style={{ backgroundColor: colors.teal100 }}
              size={80}
              label={
                isLogin.displayName != null
                  ? isLogin.displayName.substring(0, 2).toUpperCase()
                  : isLogin.email.substring(0, 2).toUpperCase()
              }
            />
          ) : (
            <Avatar.Image
              source={{
                uri: photoURL,
              }}
              size={100}
            />
          )}

          <Title
            style={
              isLogin.displayName != null ? { fontSize: 16 } : { fontSize: 13 }
            }
          >
            {isLogin.displayName != null ? isLogin.displayName : isLogin.email}
          </Title>
        </View>
        <PaperDrawer.Section style={styles.drawerSection}>
          <DrawerItemList {...props} />
          <DrawerItem
            icon={({ color, focused, size }) => (
              <AntDesign name="logout" size={size} color={colors.teal100} />
            )}
            label="Logout"
            onPress={() => {
              setIsLogin(false);
              auth.signOut();
              // props.navigation.navigate("SignIn");
            }}
          />
        </PaperDrawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}
export default function DrawerNavigation() {
  const { notifications } = useUser();
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // drawerActiveTintColor: colors.teal100,
        // title: "Dashboard",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardNavigaiton}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons
              name="dashboard"
              size={size}
              color={colors.teal100}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          drawerIcon: ({ color, focused, size }) =>
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
            ),
        }}
      />
      <Drawer.Screen
        name="Profile Settings"
        component={ProfileSettingScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="setting" size={size} color={colors.teal100} />
          ),
        }}
      />
      <Drawer.Screen
        name="Team Members"
        component={TeamMembersScreen}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="team" size={size} color={colors.teal100} />
          ),
        }}
      />
      <Drawer.Screen
        name="Deleted Batons"
        component={DeletedBatonsNavigation}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="delete" size={size} color={colors.teal100} />
          ),
        }}
      />
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
