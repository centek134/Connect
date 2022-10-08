import React, {useState, useEffect} from "react";
import "../assets/styles/Chat/Chat.css";
import {ReactComponent as Arrow } from "../assets/icons/Arrow.svg";
import {ReactComponent as AddFileIcon } from "../assets/icons/AddFileIcon.svg";
import { Message } from "./index";
import { db, collection ,getDocs, doc, addDoc, getDoc, serverTimestamp} from "../firebase";
import {useParams} from "react-router-dom";

export const Chat = () => {
  useParams();
  let roomId = window.location.pathname.slice(6);
  const [messages, setMessages] = useState<{message:string, userName:string, userImage:string, timeStamp:string}[]>([]);
  const [messageInput, setMessageInput] = useState<string> ("");
  const [roomName, setRoomName] = useState<string>("")
  
  useEffect(() => {
    fetchServerData();
  },[roomId]);
  
  async function fetchServerData(){
    const querySnapshotMessages = await getDocs(collection(db,`rooms/${roomId}/messages`));
    setMessages(querySnapshotMessages.docs.map((doc) => ({
      message:doc.data().message,
      userName:doc.data().userName,
      userImage:doc.data().userImage,
      timeStamp:doc.data().timeStamp,
    })));
    console.log(messages);
    const roomRef = doc(db, `rooms/${roomId}`);
    const roomSnap = await getDoc(roomRef);
    setRoomName(roomSnap.data()!.name)
  }
  const writeMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  }

  const checkKeyCode = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter"){
      sendMessage();
      setMessageInput("");
    }
    else{
      return false;
    }
  }

  async function sendMessage(){
    const docRef = await addDoc(collection(db,`rooms/${roomId}/messages`),{
      message:messageInput,
      timeStamp:serverTimestamp(),
      userImage:"",
      userName:""
    })
    console.log(docRef)
    console.log("new document written with id =>>",docRef.id)
    fetchServerData();
  }


//https://firebase.google.com/docs/firestore/data-model#web-version-9_1
  return (
    <main className="chat_container">
      <header className="chat_header">
        <h3 className="chat_header_name">{roomName}</h3>
      </header>
      <section className="chat_body">
        {messages.map((item,i) => {
          return <Message key={i} message={item.message} timeStamp={item.timeStamp} userImage={item.userImage} userName={item.userName}/>
        })}
      </section>
      <section className="chat_panel">
        <div className="chat_container">
          <textarea onKeyDown={(e) => checkKeyCode(e)} onChange={(e) => writeMessage(e)} value={messageInput} placeholder="Jot something down..." className="chat_textarea">
          </textarea>
          <div className="control_panel">
            <button className="add_file_btn"><AddFileIcon/></button>
            <button onClick={sendMessage} className="send_btn"><Arrow/></button>
          </div>
        </div>
      </section>
    </main>
  )
}
