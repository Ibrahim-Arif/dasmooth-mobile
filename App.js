import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { registerRootComponent } from "expo";
import { StackNavigaiton } from "./navigation/StackNavigation";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { ToastProvider } from "react-native-toast-notifications";
import { colors } from "./utilities/colors";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { StateProvider } from "./hooks/useContext";
import { batonsList } from "./utilities/batonsList";
import {
  handleGetMyBatons,
  handleGetNotifications,
  handleGetOtherBatons,
  handleGetTeamMembers,
} from "./services";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.teal100,
  },
};
initializeApp(firebaseConfig);
// console.log(DefaultTheme.colors);
export default function App() {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [permanentData, setPermanentData] = useState([]);
  const [batonsData, setBatonsData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [batons, setBatons] = useState({ ...batonsList });
  const [notifications, setNotifications] = useState([]);
  const [myBatons, setMyBatons] = useState([]);
  const [otherBatons, setOtherBatons] = useState([]);

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
  };

  useEffect(() => {
    // console.log(isLogin);
    if (isLogin) {
      handleGetTeamMembers(isLogin.uid, setTeamMembers);
      handleGetMyBatons(isLogin.uid, myBatons, setMyBatons);
      handleGetOtherBatons(isLogin.uid, otherBatons, setOtherBatons);
      handleGetNotifications(isLogin.uid, setNotifications);
    } else {
      setPermanentData([]);
      setBatonsData([]);
      setMyBatons([]);
      setOtherBatons([]);
      setTeamMembers([]);
      setNotifications([]);
    }
  }, [isLogin]);

  useEffect(() => {
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
    // console.log("Permanent:", permanentData);
  }, [myBatons, otherBatons]);

  useEffect(() => {
    setBatonsData([...permanentData]);
  }, [permanentData]);

  onAuthStateChanged(auth, (user) => {
    if (user && user.emailVerified) {
      setIsLogin(user);
    }
  });

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
