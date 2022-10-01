import React from "react";
import { Link } from "react-router-dom"

type Props = {
    roomName?: string;
    roomId?:string;
}

export const RoomItem = ({ roomName, roomId}:Props) => {
  return (
    <Link to={`/room/${roomId}`}><li className="list_item"><p className="item_text">{roomName}</p></li></Link>
  )
}