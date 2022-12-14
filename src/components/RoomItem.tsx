import React from "react";
import { Link } from "react-router-dom"
import { RoomItemProps } from "../Interfaces";
import "../assets/styles/RoomItem/RoomItem.css";

export const RoomItem = ({ roomName, roomId, setActiveSidebar}:RoomItemProps) => {
  return (
    <Link onClick={() => {setActiveSidebar(false)}} className="link" to={`/room/${roomId}`}><li className="link__item"><p className="link__item__text"># {roomName}</p></li></Link>
  );
};