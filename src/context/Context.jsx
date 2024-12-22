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
  const [services, setServices] = useState([]);

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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //get Current User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/all-services/${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
        });
    }
  }, [user?.email]);

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
        services,
        toggleTheme,
        theme,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
