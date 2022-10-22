import React, {useState, useEffect} from "react";
import "../assets/styles/Chat/Chat.css";
import {ReactComponent as Arrow } from "../assets/icons/Arrow.svg";
import {ReactComponent as AddFileIcon } from "../assets/icons/AddFileIcon.svg";
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
  },[roomId]);
  
  
  async function imgUpload(img:any){
    console.log(img);
    if(img === null) return;
    const uploadRef = ref(storage,`files/${img.name}`);
    console.log( uploadRef,);
    await uploadBytes(uploadRef,img);
    await getDownloadURL(ref(storage,`files/${img.name}`)).then(res =>{ 
      setUploadImgUrl(res);
      console.log(res);
    })
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
    return; 
  };
  async function fileExtensionValidation(event:React.ChangeEvent<HTMLInputElement>){
    if((event.target.files![0].type === "image/png") || (event.target.files![0].type === "image/jpeg") || (event.target.files![0].type === "image/webp") || (event.target.files![0].type === "image/svg+xml") || (event.target.files![0].type === "image/jpg")){
      await imgUpload(event.target.files![0]);
    }
    else{
      console.log(event.target.files)
      window.alert("Only images are allowed, please send file with one of the extensions: png, jpg, jpeg, webp, svg");
      resetFileInput();
    }
  };

  return (
    <main className="chat_container">
      <header className="chat_header">
        <h3 className="chat_header_name">{roomName}</h3>
      </header>
      <section className="chat_body">
        {messages.map((item,i) => {
          return <Message key={i} imgUrl={item.imgUrl} message={item.message} timeStamp={item.timeStamp} userImage={item.userImage} userName={item.userName}/>
        })}
      </section>
      <section className="chat_panel">
        <div className="panel_container">
          <textarea onKeyDown={(e) => checkInput(e)} onChange={(e) => writeMessage(e)} value={messageInput} placeholder="Jot something down..." className="chat_textarea"></textarea>
          <div className="control_panel">
            <input id="file_input" onChange={(event) => {fileExtensionValidation(event)}} type="file" accept="image/*"/>
            {/* <button className="add_file_btn"><AddFileIcon/></button> */}
            <button onClick={() => { sendMessage();}} className="send_btn"><Arrow/></button>
          </div>
        </div>
      </section>
    </main>
  )
}
