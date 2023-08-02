// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../../components/Navbar";
// import "./Messenger.css";
// // import "../../components/Messenger/Conversation.css";
// import Conversation from "../../components/Messenger/conversations/Conversation";
// import Message from "../../components/Messenger/message/Message";
// import ChatBooked from "../../components/Messenger/chatBooked/ChatBooked";
// import { getConversations } from "../../axios/services/ConversationServices";
// import {
//   getMessages,
//   sendNewMessage,
// } from "../../axios/services/MessageServices";
// import { io } from "socket.io-client";

// const Messenger = () => {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [bookedDoctors, setBookedDoctors] = useState([]);
//   const socket = useRef();
//   const user = JSON.parse(localStorage.getItem("user")).userExists;
//   const scrollRef = useRef();

//   useEffect(() => {
//     // socket.current = io("ws://localhost:5000");
//     // socket.current = io("https://click-n-visit.onrender.com");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", user._id);
//     socket.current.on("getUsers", (users) => {
//       setBookedDoctors(users)
//     });
//   }, [user]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getConversations(user._id);
//       setConversations(data.conversation);
//     };
//     fetchData();
//   }, [currentChat]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getMessages(currentChat?._id);
//       console.log(data);
//       setMessages(data.messages);
//     };
//     fetchData();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: user._id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user._id
//     );

//     socket.current.emit("sendMessage", {
//       senderId: user._id,
//       receiverId,
//       text: newMessage,
//     });
//     const res = await sendNewMessage(message);
//     setMessages([...messages, res.savedMessage]);
//     setNewMessage("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Navbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//           <p className="chatMenuInput" >Previous chats</p>
//             {conversations.map((convo) => (
//               <div onClick={() => setCurrentChat(convo)}>
//                 <Conversation conversation={convo} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((msg) => (
//                   <div ref={scrollRef}>
//                       <Message message={msg} own={msg.sender === user._id} />
//                       </div>
//                       ))}
//                       </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <p>Below are doctors you booked</p>
//             <ChatBooked bookedDoctors={bookedDoctors} currentUser={user._id} setCurrentChat={setCurrentChat}/>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Messenger;




































// import React, { useEffect, useRef, useState } from "react";
// import Navbar from "../../components/Navbar";
// import "./Messenger.css";
// import Conversation from "../../components/Messenger/conversations/Conversation";
// import Message from "../../components/Messenger/message/Message";
// import ChatBooked from "../../components/Messenger/chatBooked/ChatBooked";
// import { getConversations, findConvo, newConversation } from "../../axios/services/ConversationServices";
// import { getMessages, sendNewMessage } from "../../axios/services/MessageServices";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";


// const Messenger = () => {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [bookedDoctors, setBookedDoctors] = useState([]);
//   const socket = useRef();
//   const user = JSON.parse(localStorage.getItem("user")).userExists;
//   const scrollRef = useRef();

//   console.log(messages);

//   useEffect(() => {
//     socket.current = new SockJS("http://localhost:8088/ws");
   

//     const stompClient = Stomp.over(socket.current);

//     stompClient.connect({}, () => {
//       stompClient.subscribe("/topic/messages", (message) => {
//         const receivedMessage = JSON.parse(message.body);
//         console.log(receivedMessage);
//         setArrivalMessage(receivedMessage);
//       });
//     });

//     return () => {
//       stompClient.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     // socket.current.send(
//     //   JSON.stringify({
//     //     type: "ADD_USER",
//     //     userId: user.id,
//     //   })
//     // );

//     socket.current.onmessage = (event) => {
//       console.log(event)
//       // const data = JSON.parse(event);
//       // console.log(data)
//       if (event.type === "GET_USERS") {
//         setBookedDoctors(event.users);
//       }
//     };
//   }, [user]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getConversations(user.id);
//       console.log(data);
//       console.log(data.conversation)
//       setConversations(data.conversation);
//     };
//     fetchData();
//   }, [currentChat]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (currentChat) {
//         const data = await getMessages(currentChat.conversationId);
//         console.log(data);
//         const test = data.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt));
//         console.log(test);
//         setMessages(data.reverse());
//       }
//     };
//     fetchData();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(user.id);

//     if(newMessage===""){
//       return
//     }
//     const message = {
//       senderId: user.id,
//       text: newMessage,
//       conversationId: currentChat.conversationId,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== user.id
//     );

    
//     socket.current.send(
//       JSON.stringify({
//         type: "SEND_MESSAGE",
//         senderId: user.id,
//         receiverId,
//         text: newMessage,
//       })
//     );

//     const res = await sendNewMessage(message);
//     setMessages([...messages, res.savedMessage]);
//     setNewMessage("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleConversationClick =  (conversation) => {
//     setCurrentChat(conversation);
//   };

//   const handleBookedDoctorClick = async (doctorId) => {
//     const existingConvo = conversations.find(
//       (convo) =>
//         convo.members.includes(user.id) && convo.members.includes(doctorId)
//     );

//     if (existingConvo) {
//       setCurrentChat(existingConvo);
//     } else {
//       const data = await newConversation(user.id, doctorId);
//       if (data) {
//         setCurrentChat(data.conversation);
//       }
//     }
//   };

 


//   return (
//     <>
//       <Navbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <p className="chatMenuInput">Previous chats</p>
//             {conversations.map((convo) => (
//               <div onClick={() => handleConversationClick(convo)}>
//                 <Conversation conversation={convo} currentUser={user} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((msg) => (
//                     <div ref={scrollRef}>
//                       <Message message={msg} own={msg.senderId === user.id} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button
//                     className="chatSubmitButton"
//                     onClick={handleSubmit}
//                   >
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <p>Below are doctors you booked</p>
//             <ChatBooked
//               bookedDoctors={bookedDoctors}
//               currentUser={user.id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Messenger;













import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import "./Messenger.css";
import Conversation from "../../components/Messenger/conversations/Conversation";
import Message from "../../components/Messenger/message/Message";
import ChatBooked from "../../components/Messenger/chatBooked/ChatBooked";
import { getConversations, findConvo, newConversation } from "../../axios/services/ConversationServices";
import { getMessages, sendNewMessage } from "../../axios/services/MessageServices";
// import SockJS from "sockjs-client";
import Stomp from "stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  const [bookedDoctors, setBookedDoctors] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")).userExists;
  const scrollRef = useRef();
  const sock = useRef();
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);


  useEffect(() => {
    const connect = () => {
      sock.current = new SockJS("http://localhost:8088/ws");
      const temp = over(sock.current);
      setStompClient(temp);
      temp.connect({}, onConnect, onErr);
    };

    const onErr = (error) => {
      console.log("on Error", error);
    };

    const onConnect = () => {
      setConnected(true);
    };





    connect();

    return () => {
      stompClient?.disconnect();
    };
  }, []);
  

  // useEffect(() => {
  //   // ... other code

  //   const onMessageReceive = (payload) => {
  //     const receivedMessage = JSON.parse(payload.body);
  //     setArrivalMessage(receivedMessage);
  //   };



  //     // Subscribe to the topic where messages are sent
  //     const subscription = stompClient.subscribe("/topic/messages", onMessageReceive);
  //     console.log(subscription);

  //     // You can store the subscription if you need to unsubscribe later
  //     // For example, if you want to unsubscribe on component unmount:
  //     // return () => subscription.unsubscribe();


  // }, []);



  useEffect(() => {
    if (connected && stompClient) {
      console.log(connected,stompClient);
      
      const subscription = stompClient.subscribe("/group/"+user?.id.toString(), onMessageRecive);
      console.log(subscription);
     
      // stompClient.subscribe('/group/public', onMessageRecive);
      // return () => {
      //   subscription.unsubscribe();
      // };
    }
  });
  const onMessageRecive = (payload) => {
    console.log("onMessageRecive ............. -----------", payload);

    console.log("recive message -  - - - - - - -  -", JSON.parse(payload.body));

    const recievedMessage = JSON.parse(payload.body);

    setMessages([...messages, recievedMessage]);
  };



  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversations(user.id);
      console.log(data);
      console.log(data.conversation)
      setConversations(data.conversation);
    };
    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat) {
        const data = await getMessages(currentChat.conversationId);
        console.log(data);
        setMessages(data.reverse());
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user.id);

    if(newMessage===""){
      return
    }
    const message = {
      senderId: user.id,
      text: newMessage,
      conversationId: currentChat.conversationId,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.id
    );


    const msg = {
      senderId: user.id,
      receiverId: receiverId, // Add receiverId to the payload
      text: newMessage,
      // conversationId: currentChat.conversationId,
    };
    sendMessageToServer(msg);
    
    // socket.current.send(
    //   JSON.stringify({
    //     type: "SEND_MESSAGE",
    //     senderId: user.id,
    //     receiverId,
    //     text: newMessage,
    //   })
    // );

    const res = await sendNewMessage(message);
    setMessages([...messages, res.savedMessage]);
    setNewMessage("");
  };


  const sendMessageToServer = (messages) => {
    if (stompClient) {
      stompClient.send(
        `/app/message`,
        {},
        JSON.stringify(messages)
      );
    }
  };



  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  //  const container=scrollRef.current;
  //  container.scrollTop=container.scrollHeight;
  }, [messages]);

  const handleConversationClick =  (conversation) => {
    setCurrentChat(conversation);
  };

  const handleBookedDoctorClick = async (doctorId) => {
    const existingConvo = conversations.find(
      (convo) =>
        convo.members.includes(user.id) && convo.members.includes(doctorId)
    );

    if (existingConvo) {
      setCurrentChat(existingConvo);
    } else {
      const data = await newConversation(user.id, doctorId);
      if (data) {
        setCurrentChat(data.conversation);
      }
    }
  };

 


  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <p className="chatMenuInput">Previous chats</p>
            {conversations.map((convo) => (
              <div onClick={() => handleConversationClick(convo)}>
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
                   
                      <Message message={msg} own={msg.senderId === user.id} />
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
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                  >
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
            <ChatBooked
              bookedDoctors={bookedDoctors}
              currentUser={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;

