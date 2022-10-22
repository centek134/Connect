import React from "react";
import {ReactComponent as SearchIcon} from "../assets/icons/Search.svg";
import {ReactComponent as HelpIcon} from "../assets/icons/Help.svg";
import {ReactComponent as AvatarIcon} from "../assets/icons/Avatar.svg";
import "../assets/styles/Header/Header.css";



export const Header = (user:{userImg:string}) => {
  return (
    <header className="header"> 
        {user.userImg? <img src={user.userImg} alt="user"/> : <AvatarIcon className="avatar_icon"/>}
        <div className="input">
            <p>Search in Contact group...</p>
            <SearchIcon className="search_icon"/>
        </div>
        <HelpIcon className="help_icon"/>
    </header>
  );
};

