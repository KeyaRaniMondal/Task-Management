import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const provider = new GoogleAuthProvider();
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const [error, setError] = useState({});

    const handleGoogleSignIn = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            const newUser = {
                name: user.displayName,
                email: user.email,
                firebaseUID: user.uid, // Firebase authentication UID
            };

            //For Sending data to the backend
            const response = await fetch("https://task-management-backend-xi.vercel.app/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            const mongodbResult = await response.json();

            if (response.ok) {
                alert("User registered successfully");
                navigate('/showTask')
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setError({ google: "Google Sign-In failed. Please try again." });
            alert(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5] rounded-full">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                    </g>
                </svg>
                <h2 className="text-xsm -ml-1 md:text-md md:ml-0">Login with Google</h2>
            </button>
        </div>
    );
};

export default Login;



