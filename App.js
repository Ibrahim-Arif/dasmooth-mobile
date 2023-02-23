import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { StackNavigaiton } from "./navigation/StackNavigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { ToastProvider } from "react-native-toast-notifications";
import { colors } from "./utilities/colors";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";
import { StateProvider } from "./hooks/useContext";
import { batonsList } from "./utilities/batonsList";
import {
  handleGetMyBatons,
  handleGetNotifications,
  handleGetOtherBatons,
  handleGetTeamMembers,
} from "./services";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logResponse from "./utilities/logger";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.mosque,
  },
};
initializeApp(firebaseConfig);
// console.log(DefaultTheme.colors);

SplashScreen.preventAutoHideAsync();

export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s, a useEffect cleanup function,",
  ]);

  const [isLogin, setIsLogin] = useState(false);
  const [permanentData, setPermanentData] = useState([]);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [batons, setBatons] = useState({ ...batonsList });
  const [notifications, setNotifications] = useState([]);
  const [myBatons, setMyBatons] = useState([]);
  const [otherBatons, setOtherBatons] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [teamMembersLoading, setTeamMembersLoading] = useState(true);
  const [myBatonsLoading, setMyBatonsLoading] = useState(true);
  const [otherBatonsLoading, setOtherBatonsLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);

  const auth = getAuth();
  const userContextValues = {
    isLogin,
    setIsLogin,
    batonsData: batonsData,
    setBatonsData: setBatonsData,
    permanentData,
    setPermanentData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
  };

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    // logResponse("info", isLogin.photoURL);
    let isMounted = true;
    if (isMounted)
      if (isLogin) {
        // setTeamMembersLoading(true);
        // setMyBatonsLoading(true);
        // setOtherBatonsLoading(true);
        // setNotificationsLoading(true);

        setPhotoURL(isLogin.photoURL);
        handleGetTeamMembers(
          isLogin.uid,
          setTeamMembers,
          setTeamMembersLoading
        );
        handleGetMyBatons(
          isLogin.uid,
          myBatons,
          setMyBatons,
          setMyBatonsLoading
        );
        handleGetOtherBatons(
          isLogin.uid,
          otherBatons,
          setOtherBatons,
          setOtherBatonsLoading
        );
        handleGetNotifications(
          isLogin.uid,
          setNotifications,
          setNotificationsLoading
        );
      } else {
        setPermanentData([]);
        setBatonsData([]);
        setMyBatons([]);
        setOtherBatons([]);
        setTeamMembers([]);
        setNotifications([]);
      }
    return () => {
      isMounted = false;
    };
  }, [isLogin]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // console.log("batonsData useEffect, App.js", batonsData);
      let temp = [...myBatons, ...otherBatons];
      // temp = [...new Set(temp)]
      const filteredArr = temp.reduce((acc, current) => {
        const x = acc.find((item) => item.docId === current.docId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      setPermanentData(filteredArr);
    }
    return () => {
      isMounted = false;
    };
    // console.log("Permanent:", permanentData);
  }, [JSON.stringify(myBatons), JSON.stringify(otherBatons)]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setBatonsData([...permanentData]);
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(permanentData)]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (
        !myBatonsLoading &&
        !otherBatonsLoading &&
        !teamMembersLoading &&
        !notificationsLoading
      )
        hideSplashScreen();
    }
    return () => {
      isMounted = false;
    };
  }, [
    myBatonsLoading,
    otherBatonsLoading,
    teamMembersLoading,
    notificationsLoading,
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsLogin(user);
      } else {
        setTeamMembersLoading(false);
        setMyBatonsLoading(false);
        setOtherBatonsLoading(false);
        setNotificationsLoading(false);
        hideSplashScreen();
      }
    });
  }, []);

  return (
    <StateProvider values={userContextValues}>
      <PaperProvider theme={theme}>
        <ToastProvider
          // icon={<Icon />}
          placement="top"
          duration={3000}
          animationType="slide-in"
          animationDuration={250}
          successColor="white"
          dangerColor="white"
          warningColor="white"
          normalColor="gray"
          successIcon={
            <AntDesign name="infocirlceo" size={20} color={colors.success} />
          }
          dangerIcon={
            <AntDesign name="infocirlceo" size={20} color={colors.danger} />
          }
          warningIcon={
            <AntDesign name="infocirlceo" size={20} color={colors.warning} />
          }
          textStyle={{ fontSize: 13, color: "black" }}
          offset={50} // offset for both top and bottom toasts
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
          style={{ height: 80 }}
        >
          <StackNavigaiton />
        </ToastProvider>
      </PaperProvider>
    </StateProvider>
  );
}

registerRootComponent("dasmooth-mobile", App);
