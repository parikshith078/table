import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const AuthContext = createContext();

// Firestore

export function useAuth() {
  return useContext(AuthContext);
}

// authentication

export function AuthProvider({ children }) {
  const porvider = new GoogleAuthProvider();
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  // main courses state
  const [courses, setCourses] = useState([]);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
    router.push("/");
    toast.success("Logout successful");
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  // google login
  const googleLogin = () => {
    signInWithPopup(auth, porvider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
        console.log(user);
        toast.success(`Logged in as ${user.email}`);
        router.push("/sections");
      })
      .catch((error) => {});
  };

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    googleLogin,
    // courses state
    courses,
    setCourses,
    // firestore db provider
    db,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
