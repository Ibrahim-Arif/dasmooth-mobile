import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { generatePassword } from "../utilities/generatePassword";
import { handleAddUserToDatabase } from "./handleAddUserToDatabase";
import { handleForgotPassword } from "./handleForgotPassword";

export const handleSignUp = async (
  email,
  password = null,
  isInvite = false
) => {
  try {
    const auth = getAuth();
    if (password == null && isInvite) password = generatePassword(6);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (isInvite) await handleForgotPassword(userCredential.user.email);
    else await sendEmailVerification(userCredential.user);

    await handleAddUserToDatabase(userCredential.user);
    return userCredential.user;
  } catch (ex) {
    if (!isInvite) {
      if (ex.code == "auth/email-already-in-use")
        ex.message = "Email already in use!";
      throw new Error(ex.message);
    } else {
      throw new Error(ex.code);
    }
  }
};
