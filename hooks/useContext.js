import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  const {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
  } = useContext(UserContext);

  return {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
  };
};

export const StateProvider = ({ values, children }) => {
  const {
    isLogin,
    setIsLogin,
    batonsData,
    setBatonsData,
    batons,
    setBatons,
    teamMembers,
    setTeamMembers,
    permanentData,
    setPermanentData,
    notifications,
    setNotifications,
    photoURL,
    setPhotoURL,
  } = values;

  return (
    <UserContext.Provider
      value={{
        isLogin,
        setIsLogin,
        batonsData,
        setBatonsData,
        batons,
        setBatons,
        teamMembers,
        setTeamMembers,
        permanentData,
        setPermanentData,
        notifications,
        setNotifications,
        photoURL,
        setPhotoURL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
