import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import "./Messenger.css";
// import "../../components/Messenger/Conversation.css";
import Conversation from "../../components/Messenger/conversations/Conversation";
import Message from "../../components/Messenger/message/Message";
import ChatBooked from "../../components/Messenger/chatBooked/ChatBooked";
import { getConversations } from "../../axios/services/ConversationServices";
import {
  getMessages,
  sendNewMessage,
} from "../../axios/services/MessageServices";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [bookedDoctors, setBookedDoctors] = useState([]);
  const socket = useRef();
  const user = JSON.parse(localStorage.getItem("user")).userExists;
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
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setBookedDoctors(users)
    });
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversations(user._id);
      setConversations(data.conversation);
    };
    fetchData();
  }, [currentChat]);

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
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
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

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
          <p className="chatMenuInput" >Previous chats</p>
            {conversations.map((convo) => (
              <div onClick={() => setCurrentChat(convo)}>
                <Conversation conversation={convo} currentUser={user} />
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
                      <Message message={msg} own={msg.sender === user._id} />
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
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <p>Below are doctors you booked</p>
            <ChatBooked bookedDoctors={bookedDoctors} currentUser={user._id} setCurrentChat={setCurrentChat}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
