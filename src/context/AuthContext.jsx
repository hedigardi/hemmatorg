import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser as firebaseDeleteUser // Byt namn för att undvika konflikt
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Importera auth-instansen

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // För att hantera initial laddning av auth state

  useEffect(() => {
    // Lyssna på ändringar i autentiseringsstatus
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Användaren är inloggad
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          // Lägg till fler fält från currentUser om det behövs
        });
        setIsAuthenticated(true);
      } else {
        // Användaren är utloggad
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false); // Auth state har laddats
    });

    // Städa upp prenumerationen när komponenten unmountas
    return () => unsubscribe();
  }, []);

  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    // onAuthStateChanged kommer att uppdatera user state automatiskt
    return userCredential.user;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged kommer att uppdatera user state automatiskt
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged kommer att uppdatera user state automatiskt
  };

  const updateUserProfileData = async (profileData) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, profileData); // profileData bör vara { displayName: "Nytt Namn" }
      // Uppdatera lokalt user state för omedelbar feedback
      setUser(prevUser => ({ ...prevUser, ...profileData }));
    } else {
      throw new Error("Ingen användare är inloggad för att uppdatera profilen.");
    }
  };

  const deleteCurrentUserAccount = async () => {
    if (auth.currentUser) {
      await firebaseDeleteUser(auth.currentUser);
      // onAuthStateChanged hanterar resten
    } else {
      throw new Error("Ingen användare är inloggad för att radera kontot.");
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading, // Exponera loading state
      register,
      login,
      logout,
      updateUserProfileData,
      deleteCurrentUserAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
