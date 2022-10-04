import React, {useState, useEffect, useRef} from "react";
import { db, collection ,getDocs, doc} from "../firebase";
import {ReactComponent as Arrow } from "../assets/icons/Arrow.svg";
import {ReactComponent as AddFileIcon } from "../assets/icons/AddFileIcon.svg";
import {useParams} from "react-router-dom";
import { getDoc } from "firebase/firestore";
import "../assets/styles/Chat/Chat.css";

export const Chat = () => {
  useParams();
  let roomId = window.location.pathname.slice(6);
  const [messages, setMessages] = useState<{message:string, userName:string, userImage:string, timestamp:number}[]>([]);
  const [roomName, setRoomName] = useState<string>("")


  useEffect(() => {
    async function fetchMe(){
      const querySnapshotMessages = await getDocs(collection(db,`rooms/${roomId}/messages`));
      setMessages(querySnapshotMessages.docs.map((doc) => ({
        message:doc.data().message,
        userName:doc.data().userName,
        userImage:doc.data().userImage,
        timestamp:doc.data().timestamp.seconds,

      })))
      const roomRef = doc(db, `rooms/${roomId}`);
      const roomSnap = await getDoc(roomRef);
      setRoomName(roomSnap.data()!.name)
    }
    fetchMe();
  },[roomId]);
  
  const liftup = (e:any) => {
    
    console.log(e);
  }

//https://firebase.google.com/docs/firestore/data-model#web-version-9_1
  return (
    <main className="chat_container">
      <header className="chat_header">
        <h3 className="chat_header_name">{roomName}</h3>
      </header>
      <section className="chat_body">
        {messages.map((item,i) => <p key={i}>{item.message}</p>)}
      </section>
      <section className="chat_panel">
        <div className="chat_container">
          <textarea placeholder="Jot something down..." className="chat_textarea"></textarea>
          <div className="control_panel">
            <button className="add_file_btn"><AddFileIcon/></button>
            <button className="send_btn"><Arrow/></button>
          </div>
        </div>
      </section>
    </main>
  )
}
