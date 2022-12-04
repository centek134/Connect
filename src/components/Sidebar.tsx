import React, {useEffect, useState} from "react";
import { db, collection, addDoc, onSnapshot} from "../firebase";
import {Link} from "react-router-dom"
import {ReactComponent as ThreadsSVG} from "../assets/icons/Sidebar/Threads.svg";
import {ReactComponent as FilesSVG} from "../assets/icons/Sidebar/Files.svg";
import {ReactComponent as DraftsSVG} from "../assets/icons/Sidebar/Drafts.svg";
import {ReactComponent as MentionsSVG} from "../assets/icons/Sidebar/Mentions.svg";
import {ReactComponent as SavedItemsSVG} from "../assets/icons/Sidebar/SavedItems.svg";
import {ReactComponent as AppsSVG} from "../assets/icons/Sidebar/Apps.svg";
import {ReactComponent as PlusSVG} from "../assets/icons/Sidebar/Plus.svg";
import { RoomItem } from "./index";
import "../assets/styles/Sidebar/Sidebar.css";

export const Sidebar = () => {
  const [rooms, setRooms] = useState<{roomId:string, roomName:string}[]>([]);

  useEffect( () => {
    async function fetchData(){
      const querySnapshot = await collection(db,"rooms");
      onSnapshot(querySnapshot,(snap) => {
        setRooms(
          snap.docs.map( (doc) => ({
            roomId:doc.id,
            roomName:doc.data().name
          }))
        );
      });
    };
      fetchData();
    },[]);
    
  async function addChannel(){
    const roomName = prompt("Please enter channel name (between 3-10 characters):");
    if((roomName!.length >= 3) && (roomName!.length <= 10)){
      await addDoc(collection(db,"rooms"),{
        name:roomName
      });
    }
    else{
      alert("Room name is too long, please provide another name.");
      return;
    };
  };

  return (
      <nav className="nav">
        <ul className="nav__list">
          <li className="list__item"><ThreadsSVG className="item__logo"/><p className="item__text">Threads</p></li>
          <li className="list__item"><MentionsSVG className="item__logo"/><p className="item__text">Mentions & Reactions</p></li>
          <li className="list__item"><DraftsSVG className="item__logo"/><p className="item__text">Drafts</p></li>
          <li className="list__item"><SavedItemsSVG className="item__logo"/><p className="item__text">Saved Items</p></li>
          <Link to={"./files"} className="list__item"><FilesSVG className="item__logo"/><p className="item__text">Files</p></Link>
          <li className="list__item"><AppsSVG className="item__logo"/><p className="item__text">Apps</p></li>
          <li onClick={addChannel} className="list__item"><PlusSVG className="item__logo"/><p className="item__text">Add channel</p></li>
        </ul>
        <ul className="nav__chat-list">
          <h3 className="nav__chat-list__heading">Channels</h3>
          {rooms.map((item,i) => {
            return(<RoomItem key={i} roomId={item.roomId} roomName={item.roomName} />)
          })}
        </ul>
      </nav>
  );
};
