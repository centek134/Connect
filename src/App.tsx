import React from "react";
import "./assets/styles/App/App.css";
import {Chat, Sidebar, Header} from "./components/index"; 
const App = () => {
  return (
    <div className="app">
        <Header/>
      <section className="app_body">
        <Sidebar/>
        <Chat/>
      </section>
    </div>
  );
}

export default App;
