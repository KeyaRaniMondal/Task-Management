import { useState } from "react";
import { createContext } from "react";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const CreateUser = async (email, password, name, photoURL) => {
        const result = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(result.user, { displayName: name, photoURL })
        setUser(result.user)
        return result
    }

    const userInfo = {
        user,
        CreateUser,
        updateProfile,
        setUser
    }

    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    )
}
export default AuthProvider