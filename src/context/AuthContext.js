import { createContext } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const createUser = async (email, password) => {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toastSuccessNotify("Registered succesfully!");
    console.log(userCredential);
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toastSuccessNotify("Registered succesfully!");
      })
      .catch((error) => console.log(error));
  };

  const values = { createUser, signUpProvider };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
