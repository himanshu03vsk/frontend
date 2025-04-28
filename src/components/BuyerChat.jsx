import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

// Replace with the actual email of the logged-in buyer
const socket = io("https://backend-carshop.onrender.com");
// const socket = io.connect('https://your-backend-app-name.azurewebsites.net');


const BuyerChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const BUYER_EMAIL = JSON.parse(localStorage.getItem('user')).email; // You might want to dynamically set this later

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Join the room using buyer's email
    socket.emit("join_room", BUYER_EMAIL);

    // Fetch past chat messages
    axios
      .get(`https://backend-carshop.onrender.com/api/admin/chat/${BUYER_EMAIL}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching chat messages:", err));
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (
        data.sender_email === BUYER_EMAIL ||
        data.receiver_email === BUYER_EMAIL
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      sender_email: BUYER_EMAIL,
      receiver_email: "himanshu03vsk@gmail.com", // Admin email
      message: inputMessage,
    };

    socket.emit("send_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto mt-8 section shadow-lg rounded-lg border border-gray-300">
      <div className="px-6 py-4 border-b">
        <h3 className="text-xl font-semibold">Chat with Admin</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 p-3 rounded-lg max-w-[70%] ${
                msg.sender_email === BUYER_EMAIL
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-3 px-6 py-4 border-t">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default BuyerChat;
