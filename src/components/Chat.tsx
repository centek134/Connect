import React, {useState, useEffect} from "react";
import "../assets/styles/Chat/Chat.css";
import {ReactComponent as Arrow } from "../assets/icons/Arrow.svg";
import {ReactComponent as AddFileIcon } from "../assets/icons/AddFileIcon.svg";
import { Message } from "./index";
import { db, collection, doc, addDoc, getDoc, serverTimestamp, onSnapshot, query, orderBy, storage, ref, uploadBytes } from "../firebase";
import {useParams} from "react-router-dom";
interface Props{
  user: null | {name:string,userImg:string}
};

export const Chat = ({user}:Props) => {
  useParams();
  let roomId = window.location.pathname.slice(6);
  const [messages, setMessages] = useState<{ message:string, userName:string, userImage:string, timeStamp:string}[]>([]);
  const [messageInput, setMessageInput] = useState<string> ("");
  const [roomName, setRoomName] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<any>();
  
  useEffect(() => {
    fetchServerData();
  },[roomId]);
  
  
  const fileUpload = () => {
    if(uploadFile === null) return;
    const uploadRef = ref(storage,`files/${uploadFile.name}`);
    uploadBytes(uploadRef,uploadFile).then(() => {
      alert("file_uploaded");
    });
  };
  
  async function fetchServerData(){
    const q = await query(collection(db,`rooms/${roomId}/messages`),orderBy("timeStamp", "asc"));
    onSnapshot(q, (querySnapShot) => {
      console.log(querySnapShot.docs.map(doc => doc.id))
      setMessages(querySnapShot.docs.map((doc) => ({
        message:doc.data().message,
        userName:doc.data().userName,
        userImage:doc.data().userImage,
        timeStamp:doc.data().timeStamp,
      })));
    });

    const roomRef = doc(db, `rooms/${roomId}`);
    const roomSnap = await getDoc(roomRef);
    setRoomName(roomSnap.data()!.name)
  };
  const writeMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  const checkInput = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if((e.key === "Enter" && Boolean(messageInput) === false) || (e.key === "Enter" && e.shiftKey)){
      return;
    }
    else if( messageInput === "\n" && e.key === "Enter"){
      setMessageInput("".trim());
      return;
    }
    else if(messageInput.trim() === "" && e.key === "Enter"){
      setMessageInput("".trim());
      return;
    }
    else if(e.key === "Enter" && messageInput !== ""){
      sendMessage();
      setMessageInput("".trim());
    }
    else{
      return false;
    };
  };
  
  async function sendMessage(){
    await addDoc(collection(db,`rooms/${roomId}/messages`),{
      message:messageInput,
      timeStamp:serverTimestamp(),
      userImage:user!.userImg,
      userName:user!.name,
      uploadedFile:uploadFile.name,
    });
    fetchServerData();
    setMessageInput("".trim());
  };

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
        <div className="panel_container">
          <textarea onKeyDown={(e) => checkInput(e)} onChange={(e) => writeMessage(e)} value={messageInput} placeholder="Jot something down..." className="chat_textarea"></textarea>
          <div className="control_panel">
            <input onChange={(event) => setUploadFile(event.target.files![0])} type="file" />
            {/* <button className="add_file_btn"><AddFileIcon/></button> */}
            <button onClick={() => {sendMessage(); fileUpload();}} className="send_btn"><Arrow/></button>
          </div>
        </div>
      </section>
    </main>
  )
}
