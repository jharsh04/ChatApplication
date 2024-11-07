//import React, { useEffect } from "react";
import Chat from "./Chat";
function App() {
  /*const socket=io("http://localhost:3000");
  useEffect(()=>{
      socket.on("connect",()=>{
            console.log("Connected");
            
      })
      socket.on("welcome",(s)=>{
            console.log(s);
      })
      
  },[])*/
  return (
    <>
      <Chat/>
    </>
  )
}

export default App

/*import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000"); // Connect to the Socket.IO server
  const [message, setMessage] = useState(""); // State for current message
  const [messages, setMessages] = useState([]); // State for chat history

  useEffect(() => {
    // Listen for welcome message
    socket.on("welcome", (s) => {
      console.log(s);
    });

    // Listen for incoming chat messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("welcome");
      socket.off("chat message");
    };
  }, [socket]);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chat message", message); // Emit message to the server
      setMessage(""); // Clear input field
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Chat Application</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.id}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
}

export default App;*/
