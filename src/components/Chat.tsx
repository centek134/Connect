import React from "react";
import "../assets/styles/Chat/Chat.css";
export const Chat = () => {
  return (
    <main className="chat_container">
      <header className="chat_header">
        <h3 className="chat_header_name">#Channel name</h3>
      </header>
      <section className="chat_body"></section>
      <section className="chat_panel">
      </section>
    </main>
  )
}
