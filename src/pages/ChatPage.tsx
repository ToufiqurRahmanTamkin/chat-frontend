import React, { useEffect, useState } from "react";
import socket from "../utils/socket";
import { getChatHistory } from "../api/chatApi";

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const history = await getChatHistory("room1");
      setMessages(history);
    };

    fetchMessages();

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
