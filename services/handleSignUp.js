import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { handleAddUserToDatabase } from "./handleAddUserToDatabase";

export const handleSignUp = async (email, password = null) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user, {
      url: "https://dasmooth-project.web.app/signin",
    });
    await handleAddUserToDatabase(userCredential.user);
    return userCredential.user;
  } catch (ex) {
    throw new Error(ex.code);
  }
};
