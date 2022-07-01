import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./useContext";

export const useCheckSignIn = () => {
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(isLogin);
    if (isLogin.uid == null || isLogin.uid == undefined) {
      setIsLogin(false);
      navigate("/signin");
    }
  }, [isLogin]);
};
