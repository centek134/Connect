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
        <img alt="user" className="message__user-image" src={userImage}/>
        <div className="message__content-wrapp">
            <h4 className="content-wrapp__username">{userName} <span className="content-wrapp__username__timestamp">{new Date(timeStamp?.toDate()).toUTCString()}</span></h4>
            <p className="content-wrapp__message-text">{message}</p>
            {imgUrl? <div onClick={() => setZoomImg(!zoomImg)} className={zoomImg? "content-wrapp__img-wrapper img-wrapper_zoom" :"content-wrapp__img-wrapper" }><img className="img-wrapper__img-sent" src={imgUrl} alt="img that was uploaded by user"/></div> : null}
        </div>
    </div>
  );
};
