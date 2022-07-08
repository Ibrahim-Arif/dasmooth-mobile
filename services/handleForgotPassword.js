import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logResponse from "../utilities/logger";
import { firebaseAuthErrors } from "../utilities/errors";

export const handleForgotPassword = async (email) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    // console.log("here");
  } catch (ex) {
    ex.message = firebaseAuthErrors[ex.code];
    throw new Error(ex.message);
  }
};
