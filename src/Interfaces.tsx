import { Dispatch, SetStateAction } from "react"
export interface ChatProps{
    user: null | {name:string,userImg:string}
};
export interface FileItemProps {
    fileName:string,
    fileUrl:string
};
export interface HeaderProps {
    activeSidebar:boolean,
    setActiveSidebar: Dispatch<SetStateAction<boolean>>,
    user:{
      userImg:string,
      name:string
    }
};
export interface LoginProps{
    setUser: Dispatch<SetStateAction<null | {name:string,userImg:string}>>;
};
export interface MessageProps {
    message: string,
    timeStamp: any,
    userImage: string,
    userName:string,
    imgUrl?:string,
    messageId:string,
    actualUser:string,
    roomId:string
};
export interface RoomItemProps  {
    roomName?: string,
    roomId?:string,
    setActiveSidebar: Dispatch<SetStateAction<boolean>>
};
export interface SidebarProps  {
    activeSidebar:boolean,
    setActiveSidebar: Dispatch<SetStateAction<boolean>>
};