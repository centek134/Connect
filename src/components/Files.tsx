import React ,{ useEffect, useState} from 'react';
import {db, collection, onSnapshot} from "../firebase";
import "../assets/styles/Files/Files.css";

export const Files = () => {
    const [ fileFolders, setFileFolders] = useState<{fileFoldersId:string, fileFoldersName:string}[]>([]);
    
    useEffect( () => {
        async function fetchData(){
          const querySnapshot = await collection(db,"rooms");
          onSnapshot(querySnapshot,(snap) => {
            setFileFolders(
                snap.docs.map(item => ({
                  fileFoldersId: item.id,
                  fileFoldersName:item.data().name
                }))
            )
          });
        };
          fetchData();
        },[]);



  return (
    <main className="files-container">
      <header className="files-container__header">
        <h3 className="header__heading">Files</h3>
      </header>
      <section className="files-container__room-list">
        <p className="room-list__paragraph">Rooms:</p>
        {fileFolders.map((item, i) => <button onClick={() => console.log("działam")} className="room-list__button" key={i}>{item.fileFoldersName}</button>)}
      </section>
      <section className="files-container__file-list">
        <div className="file-list__item-wrap">
          <img alt="img posted by user" className="file-list__item-wrap__img" src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"/>
          <p className="file-list__item-wrap__name">File name</p>
        </div>
      </section>
    </main>

  );
};
