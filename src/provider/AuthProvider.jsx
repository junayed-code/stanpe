"use client";

import { createContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import {
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Setup the observer of the auth-state-changed.
    const unSubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  // Define the create-new-user function
  const createNewUser = async (displayName, email, password) => {
    try {
      // Update the loading state
      setLoading(true);

      // Create a new user using firebase SDK
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update the user name
      await updateProfile(user, { displayName });
      return user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Define the user log-in function
  const logInUser = async (email, password) => {
    try {
      // Update the loading state
      setLoading(true);
      // Sign in the user using the firebase SDK
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  // Define the use log-out function
  const logOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (err) {
      setLoading(false);
    }
  };

  // Login the user using google provider
  const logInWithGoogle = async () => {
    try {
      setLoading(true);
      const { user } = await signInWithPopup(auth, googleProvider);
      return user;
    } catch {
      setLoading(false);
    }
  };

  const values = {
    loading,
    currentUser,
    createNewUser,
    logInUser,
    logOutUser,
    logInWithGoogle,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
