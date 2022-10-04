import React from "react";
import "./assets/styles/App/App.css";
import {Chat, Sidebar, Header} from "./components/index";
import {Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="app">
      <section className="app_body">
        <Header/>
        <Sidebar/>
        <Routes>
          <Route path="/room/:roomid" element={<Chat/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
