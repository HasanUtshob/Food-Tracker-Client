import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase__init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  // Register Section
  const handleRegister = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // SignIn Section
  const handleSignIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign With Google
  const provider = new GoogleAuthProvider();
  const SignWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // Objerver section

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setloading(false);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // SignOut Section

  const SignOut = () => {
    setloading(true);
    return signOut(auth);
  };

  const Info = {
    handleRegister,
    handleSignIn,
    loading,
    setloading,
    User,
    setUser,
    SignOut,
    SignWithGoogle,
  };
  return <AuthContext value={Info}>{children}</AuthContext>;
};

export default AuthProvider;
