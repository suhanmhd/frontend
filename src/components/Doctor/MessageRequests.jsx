// import React, { useEffect, useRef, useState } from "react";
// import "../../pages/messenger/Messenger";
// // import "../../components/Messenger/Conversation.css";
// import Message from "../../components/Messenger/message/Message";
// import { getConversations } from "../../axios/services/ConversationServices";
// import {
//   getMessages,
//   sendNewMessage,
// } from "../../axios/services/MessageServices";

// import DoctorConvo from "./DoctorConvo";
// // import { message } from "antd";

// const MessageRequests = () => {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const socket = useRef();
//   const doctor = JSON.parse(localStorage.getItem("doctor")).doctorExists;
//   const scrollRef = useRef();

//   console.log(conversations);
//   console.log(currentChat);

//   // useEffect(() => {
//   //   socket.current = io("ws://localhost:5000");
//   //   socket.current = io("https://click-n-visit.onrender.com");
//   //   socket.current.on("getMessage", (data) => {
//   //     setArrivalMessage({
//   //       sender: data.senderId,
//   //       text: data.text,
//   //       createdAt: Date.now(),
//   //     });
//   //   });
//   // }, []);

//   // useEffect(() => {
//   //   arrivalMessage &&
//   //     currentChat?.members.includes(arrivalMessage.sender) &&
//   //     setMessages((prev) => [...prev, arrivalMessage]);
//   // }, [arrivalMessage, currentChat]);

//   // useEffect(() => {
//   //   socket.current.emit("addUser", doctor.id);
//   //   socket.current.on("getUsers", (doctor) => {
//   //     // console.log(users)
//   //   });
//   // }, [doctor]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getConversations(doctor.id);
//       setConversations(data.conversation);
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if(currentChat){
//         console.log(currentChat?.conversationId);
//         const data = await getMessages(currentChat?.conversationId);
//         console.log(data);
//         setMessages(data.reverse());
//       }
//     };
//     fetchData();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//  console.log("hell");
//     console.log(doctor.id);
//     const message = {
//       senderId: doctor.id,
//       text: newMessage,
//       conversationId: currentChat.conversationId,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== doctor.id
//     );

//     // socket.current.emit("sendMessage", {
//     //   senderId: doctor.id,
//     //   receiverId,
//     //   text: newMessage,
//     // });
//     const res = await sendNewMessage(message);
//     setMessages([...messages, res.savedMessage]);
//     setNewMessage("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   console.log(newMessage);
//   // console.log(message);

//   return (
//     <>
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             <p className="chatMenuInput">List of patients</p>
//             {conversations.map((convo) => (
//               <div onClick={() => setCurrentChat(convo)}>
//                 <DoctorConvo conversation={convo} currentUser={doctor} />
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
//                       <Message message={msg} own={msg.senderId === doctor.id} />
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
//       </div>
//     </>
//   );
// };

// export default MessageRequests;





























import React, { useEffect, useRef, useState } from "react";
import "../../pages/messenger/Messenger";
// import "../../components/Messenger/Conversation.css";
import Message from "../../components/Messenger/message/Message";
import { getConversations } from "../../axios/services/ConversationServices";
import {
  getMessages,
  sendNewMessage,
} from "../../axios/services/MessageServices";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import DoctorConvo from "./DoctorConvo";
// import { message } from "antd";

const MessageRequests = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [arrivalMessage, setArrivalMessage] = useState(null);
  const doctor = JSON.parse(localStorage.getItem("doctor")).doctorExists;
  const scrollRef = useRef();
  const sock = useRef();
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  console.log(conversations);
  console.log(currentChat);


  useEffect(() => {
    const connect = () => {
      sock.current = new SockJS("https://chat.mediconnects.online/ws");
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
  //   socket.current = io("ws://localhost:5000");
  //   socket.current = io("https://click-n-visit.onrender.com");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", doctor.id);
  //   socket.current.on("getUsers", (doctor) => {
  //     // console.log(users)
  //   });
  // }, [doctor]);

  
  useEffect(() => {
    if (connected && stompClient) {
      console.log(connected,stompClient);
      
      const subscription = stompClient.subscribe("/group/"+doctor?.id.toString(), onMessageRecive);
      console.log(subscription);
     
      // stompClient.subscribe('/group/public', onMessageRecive);
      // return () => {
      //   subscription.unsubscribe();r
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
      const data = await getConversations(doctor.id);
      setConversations(data.conversation);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if(currentChat){
        console.log(currentChat?.conversationId);
        const data = await getMessages(currentChat?.conversationId);
        console.log(data);
        setMessages(data.reverse());
      }
    };
    fetchData();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 console.log("hell");
    console.log(doctor.id);
    const message = {
      senderId: doctor.id,
      text: newMessage,
      conversationId: currentChat.conversationId,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== doctor.id
    );

    const msg = {
      senderId: doctor.id,
      receiverId: receiverId, // Add receiverId to the payload
      text: newMessage,
      // conversationId: currentChat.conversationId,
    };
    sendMessageToServer(msg);



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
  }, [messages]);

  console.log(newMessage);
  // console.log(message);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <p className="chatMenuInput">List of patients</p>
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
                      <Message message={msg} own={msg.senderId === doctor.id} />
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