import React from "react";
//import {ReactComponent as SearchIcon} from "../assets/icons/Header/Search.svg";
//import {ReactComponent as HelpIcon} from "../assets/icons/Header/Menu.svg";
import {ReactComponent as AvatarIcon} from "../assets/icons/Header/Avatar.svg";
import { HeaderProps } from "../Interfaces";
import "../assets/styles/Header/Header.css";


export const Header = ({activeSidebar ,setActiveSidebar ,user}:HeaderProps) => {
  return (
    <header className="header">
      <div className="header__user-wrapp">
        {user.userImg? <img className="header__user-wrapp__avatar-icon" src={user.userImg} alt="user"/> : <AvatarIcon className="header__user-wrapp__avatar-icon"/>}
        <p className="header__user-wrapp__avatar-name">{user.name}</p>
      </div>
      {/* <div className="header__input">
          <p>Search in Contact group...</p>
          <SearchIcon className="header__input__search-icon"/>
      <HelpIcon className="header__help-icon"/>
      </div> */}
      <div onClick={() => {setActiveSidebar(!activeSidebar)}} className="header__menu-icon"><div className={activeSidebar? "header__menu-icon__item --open" : "header__menu-icon__item"}></div></div>
    </header>
  );
};

