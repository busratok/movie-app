import { createContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      setCurrentUser({ ...currentUser, displayName: displayName });
      console.log(userCredential);
      navigate("/");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toastSuccessNotify("Registered succesfully!");
        navigate("/");
      })
      .catch((error) => toastErrorNotify(error.message));
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toastSuccessNotify("Logged in succesfully!");
      navigate("/");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL } = user;
        setCurrentUser({ displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.clear();
      }
    });
  };

  const logOut = () => {
    signOut(auth);
  };
  const values = {
    createUser,
    signUpProvider,
    signIn,
    logOut,
    currentUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
