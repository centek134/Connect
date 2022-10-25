import React, { useState } from "react";
import "../assets/styles/Message/Message.css";
interface Props {
    message: string,
    timeStamp: any,
    userImage: string,
    userName:string,
    imgUrl?:string
}
export const Message = ({message, timeStamp, userImage, userName, imgUrl}:Props) => {

  const [zoomImg, setZoomImg] = useState<boolean>(false);

  return (
    <div className="message">
        <img alt="user" className="message_user_image" src={userImage}/>
        <div className="text_wrapp">
            <h4 className="message_username">{userName} <span className="message_timestamp">{new Date(timeStamp?.toDate()).toUTCString()}</span></h4>
            <p className="message_text">{message}</p>
            {imgUrl? <div onClick={() => setZoomImg(!zoomImg)} className={zoomImg? "container_message_img zoom" :"container_message_img" }><img className="message_img" src={imgUrl} alt="img that was uploaded by user"/></div> : null}
        </div>
    </div>
  );
};
