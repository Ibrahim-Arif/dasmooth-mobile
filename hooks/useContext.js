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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
