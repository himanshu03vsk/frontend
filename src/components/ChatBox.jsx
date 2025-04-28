import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://backend-carshop.onrender.com"); // your backend URL

const ChatBox = ({ sender }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const chatMsg = {
      sender,
      message,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", chatMsg);
    setChat((prevChat) => [...prevChat, chatMsg]);
    setMessage("");
  };

  return (
    <div className="w-full max-w-md p-4 border rounded-lg shadow-md bg-blacks">
      <div className="h-60 overflow-y-auto border-b mb-4 p-2">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === sender ? "text-right" : "text-left"
            }`}
          >
            <p className="text-sm">
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
            <span className="text-xs text-gray-400">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
