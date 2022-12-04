import React, { useState } from "react";
import TrashIcon from "../assets/icons/Message/Trash.png"
import { db, deleteDoc, doc } from "../firebase";
import { MessageProps } from "../Interfaces";
import "../assets/styles/Message/Message.css";

export const Message = ({message, timeStamp, userImage, userName, imgUrl, messageId, actualUser, roomId}:MessageProps) => {

  const [zoomImg, setZoomImg] = useState<boolean>(false);
  
  async function deleteMessage(messageId:string, userName:string, actualUser:string, roomId:string){
    if(actualUser === userName){
      await deleteDoc(doc(db, `rooms/${roomId}/messages/${messageId}`));
    }
    else{
      alert("You can delete other users messages!");
    }
  };

  return (
    <div className="message">
        <img alt="user" className="message__user-image" src={userImage}/>
        <div className="message__content-wrapp">
            <h4 className="content-wrapp__username">{userName} <span className="content-wrapp__username__timestamp">{new Date(timeStamp?.toDate()).toUTCString()}</span></h4>
            <p className="content-wrapp__message-text">{message}</p>
            {imgUrl? <div onClick={() => setZoomImg(!zoomImg)} className={zoomImg? "content-wrapp__img-wrapper img-wrapper_zoom" :"content-wrapp__img-wrapper" }><img className="img-wrapper__img-sent" src={imgUrl} alt="img that was uploaded by user"/></div> : null}
        </div>
        <button onClick={() => deleteMessage(messageId, userName, actualUser, roomId)} className="message__delete-btn"><img className="message__delete-btn__img" src={TrashIcon} alt="trash icon"/></button>
    </div>
  );
};
