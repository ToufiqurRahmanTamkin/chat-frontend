import React, { useEffect, useState } from "react";
import socket from "../socket";
import { getChatHistory } from "../api/chatApi";

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (newMessage: string) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
