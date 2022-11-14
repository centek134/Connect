import React, {useState, useEffect} from "react";
import "../assets/styles/Chat/Chat.css";
import {ReactComponent as Arrow } from "../assets/icons/Chat/Arrow.svg";
import {ReactComponent as AddFileIcon } from "../assets/icons/Chat/AddFileIcon.svg";
import { Message } from "./index";
import { db, collection, doc, addDoc, getDoc, serverTimestamp, onSnapshot, query, orderBy, storage, ref, uploadBytes, getDownloadURL } from "../firebase";
import {useParams} from "react-router-dom";
interface Props{
  user: null | {name:string,userImg:string}
};

export const Chat = ({user}:Props) => {
  useParams();
  let roomId = window.location.pathname.slice(6);
  const [messages, setMessages] = useState<{ message:string, userName:string, userImage:string, timeStamp:string,imgUrl:string }[]>([]);
  const [messageInput, setMessageInput] = useState<string> ("");
  const [roomName, setRoomName] = useState<string>("");
  const [uploadImgUrl, setUploadImgUrl] = useState<string>("");
  
  useEffect(() => {
    fetchServerData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roomId]);
  
  async function imgUpload(img:File){
    if(img === null) return;
    document.getElementById("file_name")!.innerHTML = `${img.name.slice(0,10)}...`;
    const uploadRef = ref(storage,`files/${roomId}/${img.name}`);
    await uploadBytes(uploadRef,img);
    await getDownloadURL(ref(storage,`files/${roomId}/${img.name}`)).then(res =>{ 
      setUploadImgUrl(res);
    });
  };
  
  async function fetchServerData(){
    const q = await query(collection(db,`rooms/${roomId}/messages`),orderBy("timeStamp", "asc"));
    onSnapshot(q, (querySnapShot) => {
      setMessages(querySnapShot.docs.map((doc) => ({
        message:doc.data().message,
        userName:doc.data().userName,
        userImage:doc.data().userImage,
        timeStamp:doc.data().timeStamp,
        imgUrl:doc.data().imgUrl
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
    if(uploadImgUrl && e.key === "Enter"){
      sendMessage();
      return;
    }
    if((e.key === "Enter" && messageInput === "") || (e.key === "Enter" && e.shiftKey)){
      return;
    }
    else if( messageInput === "\n" && e.key === "Enter"){
      setMessageInput("");
      return;
    }
    else if(messageInput.trim() === "" && e.key === "Enter"){
      setMessageInput("");
      return;
    }
    else if(e.key === "Enter" && messageInput !== ""){
      sendMessage();
      setMessageInput("".trim());
      return;
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
      imgUrl:uploadImgUrl
    });
    setMessageInput("".trim());
    setUploadImgUrl("");
    resetFileInput();
    fetchServerData();
  };

  const resetFileInput = () => {
    const inputId = document.getElementById("file_input") as HTMLInputElement;
    inputId.type = "text";
    inputId.type = "file";
    document.getElementById("file_name")!.innerHTML = "";
    return; 
  };
  async function fileExtensionValidation(event:React.ChangeEvent<HTMLInputElement>){
    if((event.target.files![0].type === "image/png") || (event.target.files![0].type === "image/jpeg") || (event.target.files![0].type === "image/webp") || (event.target.files![0].type === "image/svg+xml") || (event.target.files![0].type === "image/jpg")){
      await imgUpload(event.target.files![0]);
    }
    else{
      window.alert("Only images are allowed, please send file with one of the extensions: png, jpg, jpeg, webp, svg");
      resetFileInput();
    };
  };

  return (
    <main className="chat-container">
      <header className="chat-container__header">
        <h3 className="header__name"># {roomName}</h3>
      </header>
      <section className="chat-container__body">
        {messages.map((item,i) => {
          return <Message key={i} imgUrl={item.imgUrl} message={item.message} timeStamp={item.timeStamp} userImage={item.userImage} userName={item.userName}/>
        })}
      </section>
      <section className="chat-container__panel">
        <div className="wrapper">
          <textarea onKeyDown={(e) => checkInput(e)} onChange={(e) => writeMessage(e)} value={messageInput} placeholder="Jot something down..." className="wrapper__textarea"></textarea>
          <div className="wrapper__button-area">
            <div className="button-area__file-btn-wrapper">
              <button className="file-btn-wrapper__file-btn" onClick={() => document.getElementById("file_input")!.click()}><AddFileIcon/></button>
              <p className="file-btn-wrapper__file-name" id="file_name"></p>
            </div>
            <input className="button-area__file-input file-input_hidden" id="file_input" onChange={(event) => {fileExtensionValidation(event)}} type="file" accept="image/*"/>
            <button onClick={() => { sendMessage();}} className="button-area__send-btn"><Arrow/></button>
          </div>
        </div>
      </section>
    </main>
  );
};
