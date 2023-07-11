import React, { useEffect, useRef, useState } from "react";
import "../../pages/messenger/Messenger";
// import "../../components/Messenger/Conversation.css";
import Message from "../../components/Messenger/message/Message";
import { getConversations } from "../../axios/services/ConversationServices";
import {
  getMessages,
  sendNewMessage,
} from "../../axios/services/MessageServices";
import { io } from "socket.io-client";
import DoctorConvo from "./DoctorConvo";
import { message } from "antd";

const MessageRequests = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const doctor = JSON.parse(localStorage.getItem("doctor")).doctorExists;
  const scrollRef = useRef();

  useEffect(() => {
    // socket.current = io("ws://localhost:5000");
    socket.current = io("https://click-n-visit.onrender.com");
    
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", doctor._id);
    socket.current.on("getUsers", (doctor) => {
      // console.log(users)
    });
  }, [doctor]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversations(doctor._id);
      setConversations(data.conversation);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMessages(currentChat?._id);
      console.log(data);
      setMessages(data.messages);
    };
    fetchData();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: doctor._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== doctor._id
    );

    socket.current.emit("sendMessage", {
      senderId: doctor._id,
      receiverId,
      text: newMessage,
    });
    const res = await sendNewMessage(message);
    setMessages([...messages, res.savedMessage]);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(newMessage)
  console.log(message)

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <p className="chatMenuInput" >List of patients</p>
            {conversations.map((convo) => (
              <div onClick={() => setCurrentChat(convo)}>
                <DoctorConvo conversation={convo} currentUser={doctor} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((msg) => (
                    <div ref={scrollRef}>
                      <Message message={msg} own={msg.sender === doctor._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageRequests;
