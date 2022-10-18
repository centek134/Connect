import React from "react";
import "../assets/styles/Message/Message.css";
interface Props {
    message: string,
    timeStamp: any,
    userImage: string,
    userName:string
}
export const Message = ({message, timeStamp, userImage, userName}:Props) => {
  return (
      
    <div className="message">
        <img alt="user" className="message_user_image" src={userImage}/>
        <div className="text_wrapp">
            <h4 className="message_username">{userName} <span className="message_timestamp">{new Date(timeStamp?.toDate()).toUTCString()}</span></h4>
            <p className="message_text">{message}</p>
        </div>
    </div>
  );
};
