
import {auth, provider} from "../../config/firebase-config"
import { signInWithPopup } from "firebase/auth"
import { Navigate, useNavigate,  } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import logo from "../logo.png"
import "./style.css"

export const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

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

    if (isAuth) {
        return <Navigate to="/dashboard" />;
      }

    return (
    <div className="login-container">
        <header className="login-header">
            <img src={logo} alt="SpendSnap Logo" className="login-logo" />
            <h1>SpendSnap</h1>
        </header>

        <section className="login-hero">
            <h2>"Track your expenses, take control of your finances."</h2>
        </section>

        <div className="login-button-container">
            <button className="login-button" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>

        <footer className="login-footer">
            Developed by Akshat Sharma | <a href="https://github.com/kshatsharmaaa">GitHub</a>
        </footer>
    </div>
    )
}