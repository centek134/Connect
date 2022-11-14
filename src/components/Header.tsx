import React from "react";
//import {ReactComponent as SearchIcon} from "../assets/icons/Header/Search.svg";
import {ReactComponent as HelpIcon} from "../assets/icons/Header/Help.svg";
import {ReactComponent as AvatarIcon} from "../assets/icons/Header/Avatar.svg";
import "../assets/styles/Header/Header.css";



export const Header = (user:{userImg:string, name:string}) => {
  return (
    <header className="header">
      <div className="header__user-wrapp">
        {user.userImg? <img className="header__user-wrapp__avatar-icon" src={user.userImg} alt="user"/> : <AvatarIcon className="header__user-wrapp__avatar-icon"/>}
        <p className="header__user-wrapp__avatar-name">{user.name}</p>
      </div>
      {/* <div className="header__input">
          <p>Search in Contact group...</p>
          <SearchIcon className="header__input__search-icon"/>
      </div> */}
      <HelpIcon className="header__help-icon"/>
    </header>
  );
};

