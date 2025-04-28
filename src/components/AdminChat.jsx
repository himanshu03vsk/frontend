import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://backend-carshop.onrender.com");
// const socket = io.connect('https://your-backend-app-name.azurewebsites.net');

const ADMIN_EMAIL = "himanshu03vsk@gmail.com";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log("Before"); // Debugging line  

    axios
      .get("https://backend-carshop.onrender.com/api/admin/chat/get-users")
      .then((res) => {
        console.log("Fetched users:", res.data); // Debugging line  
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching chat users:", err);
      });
  }, []);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (
        data.sender_email === currentUserEmail ||
        data.receiver_email === currentUserEmail
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [currentUserEmail]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      sender_email: ADMIN_EMAIL,
      receiver_email: currentUserEmail,
      message: inputMessage,
    };

    socket.emit("send_message", messageData);
    socket.emit("join_room", ADMIN_EMAIL); // Ensure admin is in the room
    socket.emit("join_room", currentUserEmail); // Ensure buyer's room is active too
    setMessages((prev) => [...prev, messageData]);
    setInputMessage("");
  };

  const startChat = async (email) => {
    setCurrentUserEmail(email);
    try {
      const res = await axios.get(
        `https://backend-carshop.onrender.com/api/admin/chat/${email}`
      );
      setMessages(res.data);
      socket.emit("join_room", email);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] max-w-5xl mx-auto mt-8 section shadow-lg rounded-lg overflow-hidden border border-gray-300">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4 border-b md:border-r overflow-y-auto md:h-full">
        <h3 className="text-black text-lg font-bold mb-4">Buyers</h3>
        {users.length === 0 && (
          <p className="text-sm text-gray-500">No users yet.</p>
        )}
        {users.map((email) => (
          <button
            key={email}
            onClick={() => startChat(email)}
            className={`w-full text-left p-3 mb-2 rounded-md transition ${
              email === currentUserEmail
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            {email}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-full md:w-2/3 flex flex-col justify-between p-4">
      <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">
              Chatting with: {currentUserEmail}
            </h3>
          </div>
        <div className="h-full overflow-y-auto mb-4 pr-1">
          {currentUserEmail ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg max-w-[70%] ${
                  msg.sender_email === ADMIN_EMAIL
                    ? "ml-auto bg-blue-500 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            ))
          ) : (
            <p className="text-gray-500 mt-20 text-center">
              Select a user to start chatting.
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {currentUserEmail && (
          <div className="flex items-center gap-2 border-t pt-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
