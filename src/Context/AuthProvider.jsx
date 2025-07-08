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
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  const [loading, setloading] = useState(true);
  const [userData, setuserData] = useState(null);
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
  // userData load

  useEffect(() => {
    const email = User?.email;
    if (email) {
      const loadData = async () => {
        const res = await axios.get(
          `https://food-tracker-server-six.vercel.app/users?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${User?.accessToken}`,
            },
          }
        );
        setuserData(res.data[0]);
      };
      loadData();
    }
  }, [User]);

  const Info = {
    handleRegister,
    handleSignIn,
    loading,
    setloading,
    User,
    setUser,
    SignOut,
    userData,
    SignWithGoogle,
  };
  return <AuthContext value={Info}>{children}</AuthContext>;
};

export default AuthProvider;
