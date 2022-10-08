import React from "react";
import "../assets/styles/WelcomePage/WelcomePage.css";
import {ReactComponent as WelcomeIcon} from "../assets/icons/Welcome.svg";
export const WelcomePage = () => {
  return (
    <section className="welcome_page_wrapper">
        <article className="welcome_container">
            <div className="welcome_header_cont"><WelcomeIcon/><h2>Welcome!</h2></div>
            <p className="welcome_text">Contact is messaging app for strangers! Check one of rooms and make a bunch of friends!!!</p>
        </article>
    </section>
  );
};
