import React from "react";
import {ReactComponent as SearchIcon} from "../assets/icons/Header/Search.svg";
import {ReactComponent as HelpIcon} from "../assets/icons/Header/Help.svg";
import {ReactComponent as AvatarIcon} from "../assets/icons/Header/Avatar.svg";
import "../assets/styles/Header/Header.css";



export const Header = (user:{userImg:string, name:string}) => {
  return (
    <header className="header">
      <div className="user_wrapp">
        {user.userImg? <img className="avatar_icon" src={user.userImg} alt="user"/> : <AvatarIcon className="avatar_icon"/>}
        <p className="avatar_name">{user.name}</p>
      </div>
        <div className="input">
            <p>Search in Contact group...</p>
            <SearchIcon className="search_icon"/>
        </div>
        <HelpIcon className="help_icon"/>
    </header>
  );
};

