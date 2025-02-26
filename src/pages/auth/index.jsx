
import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate,  } from "react-router-dom";
// import { useGetUserInfo } from "../../hooks/useGetUserInfo";

export const Auth = () => {
    const navigate = useNavigate();
    // const { isAuth } = useGetUserInfo();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/dashboard");
    }

    // if (isAuth) {
    //     return <Navigate to="/dashboard" />;
    //   }

    return (
    <div className="login-page">
        <p>Sign In with Google to continue!</p>
        <button className=""
        onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
    )
}