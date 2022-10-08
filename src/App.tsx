import React from "react";
import "./assets/styles/App/App.css";
import {Chat, Sidebar, Header, WelcomePage, Login} from "./components/index";
import {Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <Login/>
    </div>
  );
};
      // <section className="app_body">
      //   <Header/>
      //   <Sidebar/>
      //   <Routes>
      //   <Route path="/" element={<WelcomePage/>}/>
      //     <Route path="/room/:roomid" element={<Chat/>}/>
      //   </Routes>
      // </section>
export default App;
