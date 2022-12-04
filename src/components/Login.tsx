import React from "react";
import Avatar from "../assets/icons/Header/Avatar.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { LoginProps } from "../Interfaces";
import "../assets/styles/Login/Login.css";
import  "firebase/compat/app";

export const Login = ({setUser}:LoginProps) => {
    
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
        const user:string = localStorage.getItem("user")!;
        if(user){
            setUser({
                name: user,
                userImg:Avatar
            });
        }
        else{
            const randomNumber: number = Math.floor(Math.random()*10000) + 1;
            const name = `Guest${randomNumber.toString()}`;
            localStorage.setItem("user", name);
            setUser({
                name:name,
                userImg:Avatar
            });
        };
    };
  return (
    <section className="login">
        <div className="login__panel">
            <h1 className="login__panel__header">Contact</h1>
            <p className="login__panel__text">Do you like typing with people? Don't let this opportunity slip away! Let's join us and start making friends.</p>
            <div className="login__panel__btn-wrapp">
            <button className="btn-wrapp__login-btn" onClick={signInGoogle}>Sign in with Google</button>
            <button className="btn-wrapp__login-btn" onClick={signInGuest} >Sign in as Guest</button>
            </div>
        </div>
    </section>
  );
};