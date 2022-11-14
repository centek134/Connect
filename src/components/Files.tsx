import React ,{  useEffect, useState} from 'react';
import {db, collection, onSnapshot, ref, storage, getDownloadURL, list} from "../firebase";
import { FileItem } from "./index";
import "../assets/styles/Files/Files.css";

export const Files = () => {
    const [ fileFolders, setFileFolders ] = useState<{fileFoldersId:string, fileFoldersName:string}[]>([]);
    const [ fileList, setFileList ] = useState<{fileName:string, fileUrl:string}[] | null>(null);

    useEffect( () => { fetchData(); },[]); 

    async function fetchData(){
      const querySnapshot = collection(db,"rooms");
      onSnapshot(querySnapshot,(snap) => {
        setFileFolders(
            snap.docs.map(item => ({
              fileFoldersId: item.id,
              fileFoldersName:item.data().name
          }))
        );
      });
    };

   async function fetchImages(id:string){
     let itemArray: {fileName:string, fileUrl:string}[] =[];
     await list(ref(storage, `files/${id}`),{maxResults:30}).then( res => {
      if(res.items.length === 0){
        setFileList(null);
        return;
      };
      res.items.forEach( itemRef => {
        getDownloadURL(ref(storage,itemRef.fullPath)).then( res => {
          itemArray.push({fileName: itemRef.name, fileUrl: res});
          setFileList(itemArray.map( item => ({
            fileName: item.fileName,
            fileUrl: item.fileUrl
          }))); 
        });
      });
    });
  };

  const btnClassHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    document.querySelectorAll(".room-list__button").forEach(item => item.classList.remove("_button-black"));
    e.currentTarget.classList.add("_button-black");
  };
  
  return (
    <main className="files-container">
      <header className="files-container__header">
        <h3 className="header__heading">Files</h3>
      </header>
      <section className="files-container__room-list">
        <p className="room-list__paragraph">Rooms:</p>
        {fileFolders.map((item, i) => <button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {fetchImages(item.fileFoldersId); btnClassHandler(e) }} className="room-list__button" key={i}>{item.fileFoldersName}</button>)}
      </section>
      <section className="files-container__file-list">
        {fileList? fileList.map((item,i) => <FileItem key={i} fileName={item.fileName} fileUrl={item.fileUrl}/>):null} 
      </section>
    </main>

  );
};
