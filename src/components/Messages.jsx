import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Fetch messages from Firestore
  const fetchMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messagesArray = querySnapshot.docs.map((doc) => doc.data());
    setMessages(messagesArray);
  };

  // Send a message
  const sendMessage = async () => {
    await addDoc(collection(db, "messages"), {
      text: message,
      timestamp: new Date(),
    });
    setMessage("");
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Messages;