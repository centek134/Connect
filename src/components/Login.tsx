import React, { Dispatch, SetStateAction } from "react";
import "../assets/styles/Login/Login.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import {  } from "firebase/app"
import  "firebase/compat/app";

interface Props{
    setUser: Dispatch<SetStateAction<{}>>;
}

export const Login = ({setUser}:Props) => {
    

    const signIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(result => {
            setUser({
                name:result.user.displayName,
                userImg:result.user.photoURL
                })
            console.log(result);
        }).catch((err) => console.log(err))
    
    };

  return (
    <section className="login_section">
        <div className="login_panel">
            <h1 className="panel_header">Contact</h1>
            <p className="panel_text">Do you like typing with people? Don't let this opportunity slip away! Let's join us and start making friends.</p>
            <div className="button_container">
            <button className="login_btn google" onClick={signIn}>Sign in with Google</button>
            <button className="login_btn guest" >Sign in as Guest</button>
            </div>
        </div>
    </section>
  )
}

