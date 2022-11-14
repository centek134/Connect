import React ,{ useState}from "react";
import "./assets/styles/App/App.css";
import {Chat, Sidebar, Header, WelcomePage, Login, Files} from "./components/index";
import {Routes, Route } from "react-router-dom";
const App = () => {
  const [user, setUser] = useState<null | {name:string,userImg:string}>(null);
  return (
    <div className="app">
        {user ? (
        <section className="app_body">
        <Header userImg = {user.userImg} name={user.name}/>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/files" element={<Files/>}/>
          <Route path="/room/:roomid" element={<Chat user = {user}/>}/>
        </Routes>
      </section>
        ):(
          <Login setUser = {setUser} />
        ) }
    </div>
  );
};
// Project created by Tomasz Osuch all rights reserved ©
export default App;
