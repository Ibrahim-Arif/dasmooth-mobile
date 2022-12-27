import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  Avatar,
  Title,
  Drawer as PaperDrawer,
  IconButton,
} from "react-native-paper";
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

const CustomDrawerContent = ({ state, descriptors, navigation }) => {
  const auth = getAuth();
  const { setIsLogin, isLogin, photoURL, notifications } = useUser();

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            {photoURL == null || photoURL == "" || photoURL.includes("blob") ? (
              <Avatar.Text
                style={{ backgroundColor: colors.mosque }}
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

            <IconButton
              size={24}
              icon="pencil"
              color={colors.mosque}
              style={{
                position: "absolute",
                bottom: -10,
                right: -10,
                backgroundColor: colors.white,
              }}
              onPress={() => navigation.navigate("Profile Settings")}
            />
          </View>

          <Title
            style={[
              isLogin.displayName != null ? { fontSize: 16 } : { fontSize: 13 },
              { color: colors.darkBlue },
            ]}
          >
            {isLogin.displayName != null ? isLogin.displayName : isLogin.email}
          </Title>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerSection}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            // console.log(options);
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                target: route.key,
                canPreventDefault: true,
                type: "drawerPress",
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
              navigation.closeDrawer();
            };

            const onLongPress = () => {
              navigation.emit({
                type: "drawerLongPress",
                target: route.key,
              });
              navigation.closeDrawer();
            };

            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: isFocused ? colors.white : colors.azure,
                  padding: 20,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {options?.drawerIcon({
                    color: colors.mosque,
                    focused: isFocused,
                    size: 18,
                  })}
                  <Text
                    style={{
                      color: colors.mosque,
                      marginLeft: 15,
                      fontSize: 16,
                    }}
                  >
                    {route.name}
                  </Text>

                  {route.name === "Notifications" &&
                    notifications.length > 0 && (
                      <View
                        style={{
                          backgroundColor: colors.mosque,
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 18,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.white,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {notifications.length}
                        </Text>
                      </View>
                    )}
                </View>
              </Pressable>
            );
          })}

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setIsLogin(false);
              auth.signOut();
              // props.navigation.navigate("SignIn");
            }}
            style={{
              flex: 1,
              backgroundColor: colors.azure,
              padding: 20,
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AntDesign name="logout" size={18} color={colors.mosque} />
              <Text
                style={{
                  color: colors.mosque,
                  marginLeft: 15,
                  fontSize: 16,
                }}
              >
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.azure,
        },
        drawerActiveBackgroundColor: "white",
        drawerInactiveTintColor: colors.mosque,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardNavigaiton}
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons name="dashboard" size={size} color={colors.mosque} />
          ),
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="bells" size={size} color={colors.mosque} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile Settings"
        component={ProfileSettingScreen}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="setting" size={size} color={colors.mosque} />
          ),
        }}
      />
      <Drawer.Screen
        name="Team Members"
        component={TeamMembersScreen}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="team" size={size} color={colors.mosque} />
          ),
        }}
      />
      <Drawer.Screen
        name="Deleted Batons"
        component={DeletedBatonsNavigation}
        options={{
          drawerItemStyle: {
            display: "none",
          },
          drawerIcon: ({ color, focused, size }) => (
            <AntDesign name="delete" size={size} color={colors.mosque} />
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
