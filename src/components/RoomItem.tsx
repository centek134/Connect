import React from "react";
import "../assets/styles/RoomItem/RoomItem.css";
import { Link } from "react-router-dom"

type Props = {
    roomName?: string;
    roomId?:string;
}

export const RoomItem = ({ roomName, roomId}:Props) => {
  return (
    <Link className="link" to={`/room/${roomId}`}><li className="link__item"><p className="link__item__text"># {roomName}</p></li></Link>
  );
};