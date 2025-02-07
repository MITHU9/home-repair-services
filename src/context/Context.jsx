import { createContext, useContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AOS from "aos";
import axios from "axios";

import { auth } from "../firebase/firebase.init";

const ServiceContext = createContext({
  signInWithGoogle: () => {},
  signInWithEmail: () => {},
  signOut: () => {},
  setLoading: () => {},
});

export const useServiceContext = () => {
  return useContext(ServiceContext);
};

const ServiceContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  //Authenticating the user
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createUserWithEmail = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password, name);
  };

  const signInWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //theme change
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    AOS.refreshHard();
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTimeout(() => {
      AOS.refresh(); // Re-apply AOS triggers
    }, 100);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //get Current User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        const authUser = { email: user.email };
        axios
          .post("https://home-repaire-bakcend.vercel.app/jwt", authUser, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setUser(user);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://home-repaire-bakcend.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            //console.log(res.data);
            if (res) {
              setUser(null);
              setLoading(false);
            }
          });
      }
    });

    return () => unsubscribe();
  }, []);

  //console.log(services);

  return (
    <ServiceContext.Provider
      value={{
        loading,
        setLoading,
        signInWithGoogle,
        createUserWithEmail,
        signInWithEmail,
        signOutUser,
        updateUser,
        user,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
