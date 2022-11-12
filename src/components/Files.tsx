import React ,{ useEffect, useState} from 'react';
import {db, collection, onSnapshot, ref, storage, getDownloadURL, list} from "../firebase";
import "../assets/styles/Files/Files.css";

export const Files = () => {
    const [ fileFolders, setFileFolders ] = useState<{fileFoldersId:string, fileFoldersName:string}[]>([]);
    const [ fileList, setFileList ] = useState<{fileName:string, fileUrl:string, promise?:any}[] | null>(null);

    useEffect( () => { fetchData(); },[]); 

        async function fetchData(){
          const querySnapshot = await collection(db,"rooms");
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
      const itemArray: {fileName:string, fileUrl:string}[] = []
      let state: any = [];
       await list(ref(storage, `files/${id}`),{maxResults:30}).then( res => {
        if(res.items.length === 0){
          setFileList(null);
          return;
        };
        res.items.forEach( async itemRef => {
           await getDownloadURL(ref(storage,itemRef.fullPath)).then( res => {
            itemArray.push({fileName: itemRef.name, fileUrl: res});
            setFileList(itemArray.map( item => ({
              fileName: item.fileName,
              fileUrl: item.fileUrl
            })));
            state = [...itemArray]
            console.log(state);
          });
        });
      });
       
    };

  return (
    <main className="files-container">
      <header className="files-container__header">
        <h3 className="header__heading">Files</h3>
      </header>
      <section className="files-container__room-list">
        <p className="room-list__paragraph">Rooms:</p>
        {fileFolders.map((item, i) => <button onClick={() => fetchImages(item.fileFoldersId)} className="room-list__button" key={i}>{item.fileFoldersName}</button>)}
      </section>
      <section className="files-container__file-list" onClick={() => console.log(fileList)}>
        {fileList? fileList.map((item,i) => {
          return(
        <div key={i} className="file-list__item-wrap">
          <img alt="img posted by user" className="file-list__item-wrap__img" src={item.fileUrl}/>
          <p className="file-list__item-wrap__name">{item.fileName}</p>
        </div> 
          );
        }):null} 
        {/* <div className="file-list__item-wrap">
          <img alt="img posted by user" className="file-list__item-wrap__img" src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"/>
          <p className="file-list__item-wrap__name">File name</p>
        </div> */}
      </section>
    </main>

  );
};
