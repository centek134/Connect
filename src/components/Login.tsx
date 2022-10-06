import React from "react";
import "../assets/styles/Login/Login.css";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth"
import {  } from "firebase/app"
import { db } from "../firebase";
import  "firebase/compat/app";
export const Login = () => {

    const signIn = () => {
        let provider = new OAuthProvider("google.com");
        const auth = getAuth();
        signInWithPopup(auth,provider).then(result => {
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

