import React, {useEffect, useState} from "react";
import { db, collection,  getDocs} from "../firebase";
import "../assets/styles/Sidebar/Sidebar.css";
import {ReactComponent as ThreadsSVG} from "../assets/icons/Threads.svg";
import {ReactComponent as FilesSVG} from "../assets/icons/Files.svg";
import {ReactComponent as DraftsSVG} from "../assets/icons/Drafts.svg";
import {ReactComponent as MentionsSVG} from "../assets/icons/Mentions.svg";
import {ReactComponent as SavedItemsSVG} from "../assets/icons/SavedItems.svg";
import {ReactComponent as AppsSVG} from "../assets/icons/Apps.svg";
import { RoomItem } from "./RoomItem";

export const Sidebar = () => {
  const [rooms, setRooms] = useState<{roomId:string, roomName:string}[]>([]);

  useEffect( () => { 
    async function fetchData(){
        const querySnapshot = await getDocs(collection(db,"rooms"))
        setRooms(
          querySnapshot.docs.map((doc) => ({
            roomId:doc.id,
            roomName:doc.data().name
          }))
        )
      }
      fetchData();
    },[])
    
  console.log(rooms);
  return (
      <nav className="nav">
        <ul className="nav_list">
          <li className="list_item"><ThreadsSVG className="item_logo"/><p className="item_text">Threads</p></li>
          <li className="list_item"><MentionsSVG className="item_logo"/><p className="item_text">Mentions & Reactions</p></li>
          <li className="list_item"><DraftsSVG className="item_logo"/><p className="item_text">Drafts</p></li>
          <li className="list_item"><SavedItemsSVG className="item_logo"/><p className="item_text">Saved Items</p></li>
          <li className="list_item"><FilesSVG className="item_logo"/><p className="item_text">Files</p></li>
          <li className="list_item"><AppsSVG className="item_logo"/><p className="item_text">Apps</p></li>
        </ul>
        <ul className="nav_chat_list">
          {rooms.map((item,i) => {
            return(<RoomItem key={i} roomId={item.roomId} roomName={item.roomName} />)
          })}
        </ul>
      </nav>
  )
}
