// src/Chat.js
/*import React, { useEffect, useState, useMemo } from 'react';//Method-1
import { io } from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users,setUsers]=useState([]);

  // socket.io connection build for the first time for each socket
  const socket = useMemo(() => io("http://localhost:3000"), []);

  useEffect(() => {
    // Receive messages from the server
    socket.emit("register", { userId:"helllo hi hiiii"});
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("users",(userList)=>{
        console.log("This is the following userList",userList);
        setUsers(userList);
    })
    

    // Cleanup on unmount
    return () => socket.off("chatMessage");
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {  // Ensure message is not empty
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit("chatMessage", message); // Trigger the chatMessage event
      setMessage("");  // Clear input after sending
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>One-on-One Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg}</strong>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>Send</button>
      </form>
    </div>
  );
};

export default Chat;*/
// src/Chat.js Method-2
/*import React, { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const[socketid,setSocketid]=useState("")
  const[data,setData]=useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room ,setRoom]=useState("")  // Target user for messaging
  const [roomName,setRoomName]=useState("")
  // Establish a socket connection for the component
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    // Listen for incoming chat messages
    socket.on("connect",()=>{
      setSocketid(socket.id)
      console.log("connected",socket.id)
    })

   // socket.emit("message",{message,room});
    // Listen for updates to the list of online users
    socket.on("recieved-message",(data)=>{
          console.log(`As i have recieved the data from the  specific socket id:${data}`);
          setData(previous=>[...previous,data]);
    })
    
  }, [socket]);
  const handleRoom=(e)=>{
    e.preventDefault();
    socket.emit("join-room",roomName);
    setRoomName("");
    console.log(e);
  }
  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message",{message,room});
    console.log(e);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>One-on-One Chat</h2>
      <form onSubmit={handleRoom} style={{ display: "flex" }}>
        <input type="text"  placeholder="Enter the name of room" onChange={(e)=>{setRoomName(e.target.value)}}/>
        <button type="submit" style={{ padding: "10px",backgroundColor:"blueviolet" }}>Join</button>
      </form>
      <div> Socket id is :{socketid}</div>
      From Sender:{data}
      /* Message input */
      /*<form onSubmit={handleSendMessage} style={{ display: "flex" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <input type="text"  placeholder="Enter the socked Id" onChange={(e)=>{setRoom(e.target.value)}}/>
        <button type="submit" style={{ padding: "10px",backgroundColor:"blueviolet" }}>Send</button>
      </form>
    </div>
  );
};

export default Chat;*/

import React, { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';//Method-3

const Chat = () => {
  const [socketId, setSocketId] = useState("");//for readability
  const [receivedMessages, setReceivedMessages] = useState([]); //for maintaining the recieved messages from the other socket Id.
  const [message, setMessage] = useState("");//for maintaining the current message
  const [room, setRoom] = useState(""); //for passing the socket id for sending the message
  const [roomName, setRoomName] = useState("");//to track the Room name

  // Establish a socket connection for the component
  /*const socket = useMemo(() => io("http://localhost:3000"), []);*/
  const socket = useMemo(() => {
    return io("https://your-backend-url.com");  // Update with your backend WebSocket URL
  }, []);

  useEffect(() => {
    // Set up the socket connection and event listeners
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected:", socket.id);
    });

    socket.on("recieved-message", (data) => {
      console.log(`Received data from socket id: ${data}`);
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup event listeners on unmount
    return () => {
      socket.off("connect");
      socket.off("recieved-message");
    };
  }, [socket]);

  const handleRoomJoin = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoom(roomName)
    setRoomName("");
    console.log("Joined room:", roomName);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>One-on-One Chat</h2>
      <form onSubmit={handleRoomJoin} style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "blueviolet" }}>
          Join Room
        </button>
      </form>

      <div>Socket ID: {socketId}</div>

      <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px", height: "300px", overflowY: "scroll" }}>
        {receivedMessages.map((msg, index) => (
          <div key={index}>
            <strong>From Sender:{msg}</strong>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Target Socket ID"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          style={{ padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "blueviolet" }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;


