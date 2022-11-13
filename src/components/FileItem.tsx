import React from "react"
import "../assets/styles/FileItem/FileItem.css";
interface Props {
    fileName:string,
    fileUrl:string
}

export const FileItem = ({ fileName, fileUrl }:Props) => {
  return (
    <div className="file-list__item-wrap">
        <img alt="img posted by user" className="file-list__item-wrap__img" src={fileUrl}/>
        <p className="file-list__item-wrap__name">{fileName}</p>
    </div> 
  );
};

