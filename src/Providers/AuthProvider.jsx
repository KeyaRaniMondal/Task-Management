import { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/firebase.config";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      });
  
      return () => unsubscribe(); // Cleanup subscription
    }, []);
  
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
    };     
        
    const userInfo = {
        user,
        updateProfile,
        setUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider


