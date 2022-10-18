import React from "react";
import "../assets/styles/RoomItem/RoomItem.css";
import { Link } from "react-router-dom"

type Props = {
    roomName?: string;
    roomId?:string;
}

export const RoomItem = ({ roomName, roomId}:Props) => {
  return (
    <Link className="room_link" to={`/room/${roomId}`}><li className="room_item"><p className="room_text"># {roomName}</p></li></Link>
  )
}