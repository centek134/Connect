import React,{useState} from "react"
import DownloadIconSrc from "../assets/icons/FilesItem/Download.png";
import { FileItemProps } from "../Interfaces";
import "../assets/styles/FileItem/FileItem.css";

export const FileItem = ({ fileName, fileUrl }:FileItemProps) => {
  
  const [zoomImg, setZoomImg] = useState<boolean>(false);
  return (
    <div className="file-list__item-wrap">
        <div onClick={() => setZoomImg(!zoomImg)} className={zoomImg? "zoom-wrap zoom-wrap_zoomed": "zoom-wrap"}>
          <img alt="img posted by user" className="file-list__item-wrap__img" src={fileUrl}/>
        </div>
        <p className="file-list__item-wrap__name">{fileName}</p>
        <a href={fileUrl} rel="noreferrer" target="_blank" className="file-list__item-wrap__download-btn"><img alt="download icon" src={DownloadIconSrc}/></a>
    </div> 
  );
};

