import React from "react";
import "../assets/styles/WelcomePage/WelcomePage.css";
import {ReactComponent as WelcomeIcon} from "../assets/icons/Chat/Welcome.svg";
export const WelcomePage = () => {
  return (
    <section className="welcome-page">
        <article className="welcome-page__article">
            <div className="article__heading-wrapp"><WelcomeIcon className="article__header-wrapp__icon"/><h2 className="article__header-wrapp__heading">Welcome!</h2></div>
            <p className="article__text">Contact is messaging app for strangers! Check one of rooms and make a bunch of friends!!!</p>
        </article>
    </section>
  );
};
