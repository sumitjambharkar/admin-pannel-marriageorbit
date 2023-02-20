import { createContext, useEffect, useState,useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth, (result) => {
      setUser(result);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return "wait";
  }
  return (
    <AuthContext.Provider value={{ user,name,setName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
