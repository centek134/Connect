import React, { Dispatch, SetStateAction } from "react";
import "../assets/styles/Login/Login.css";
import Avatar from "../assets/icons/Avatar.svg"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import  "firebase/compat/app";

interface Props{
    setUser: Dispatch<SetStateAction<null | {name:string,userImg:string}>>;
};

export const Login = ({setUser}:Props) => {
    
    const signInGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(result => {
            setUser({
                name:result.user.displayName!,
                userImg:result.user.photoURL!
                });
        }).catch((err) => console.log(err));
    };

    const signInGuest = () => {
        const randomNumber: number = Math.floor(Math.random()*10000) + 1;
        const name = `Guest${randomNumber.toString()}`;
        setUser({
            name:name,
            userImg:Avatar
        });
    };
  return (
    <section className="login_section">
        <div className="login_panel">
            <h1 className="panel_header">Contact</h1>
            <p className="panel_text">Do you like typing with people? Don't let this opportunity slip away! Let's join us and start making friends.</p>
            <div className="button_container">
            <button className="login_btn google" onClick={signInGoogle}>Sign in with Google</button>
            <button className="login_btn guest" onClick={signInGuest} >Sign in as Guest</button>
            </div>
        </div>
    </section>
  );
};

