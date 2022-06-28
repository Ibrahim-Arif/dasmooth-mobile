import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const handleForgotPassword = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    console.log("here");
  } catch (ex) {
    throw new Error(ex);
  }
};
