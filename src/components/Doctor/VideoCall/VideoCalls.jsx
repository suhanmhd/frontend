// import React, { useState, useEffect, useRef } from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useParams } from 'react-router-dom';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';

// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   var chars =
//     '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
//   var maxPos = chars.length;
//   var i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(url = window.location.href) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// function VideoCalls() {
//   const { appointment } = useParams();
//   const [personalLink, setPersonalLink] = useState(null);
//   const sock = useRef();
//   const [connected, setConnected] = useState(false);
//   const [stompClient, setStompClient] = useState(null);

//   const appointmentData = JSON.parse(decodeURIComponent(appointment));

//   const connect = () => {
//     sock.current = new SockJS('http://localhost:8088/ws');
//     const temp = over(sock.current);
//     setStompClient(temp);
//     temp.connect({}, onConnect, onErr);
//   };

//   const onErr = (error) => {
//     console.log('on Error', error);
//   };

//   const onConnect = () => {
//     setConnected(true);
//   };

//   useEffect(() => {
//     connect();

//     return () => {
//       stompClient?.disconnect();
//     };
//   }, []);

//   const sendMessageToServer = (messages) => {
//     if (stompClient) {
//       stompClient.send('/app/videolink', {}, JSON.stringify(messages));
//     }
//   };
//   const myMeeting = async () => {
//     const roomID = getUrlParams().get('roomID') || randomID(5);
  
//     const appID = 336316424;
//     const serverSecret = '15db26c900a7105bc13029127742eae1';
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomID,
//       randomID(5),
//       randomID(5)
//     );
  
//     const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
  
//     const link =
//       window.location.protocol +
//       '//' +
//       window.location.host +
//       window.location.pathname +
//       '?roomID=' +
//       roomID;
  
//     const msg = {
//       senderId: appointmentData.id,
//       receiverId: appointmentData.userId,
//       text: link,
//     };
  
//     await zpInstance.joinRoom({
//       sharedLinks: [
//         {
//           name: 'Personal link',
//           url: link,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall,
//       },
//     });
  
//     // Now that the joinRoom is complete, you can send the message
//     sendMessageToServer(msg);
//   };
  

//   // const myMeeting = async () => {
//   //   const roomID = getUrlParams().get('roomID') || randomID(5);

//   //   const appID = 336316424;
//   //   const serverSecret = '15db26c900a7105bc13029127742eae1';
//   //   const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//   //     appID,
//   //     serverSecret,
//   //     roomID,
//   //     randomID(5),
//   //     randomID(5)
//   //   );

//   //   const zpInstance = ZegoUIKitPrebuilt.create(kitToken);

//   //   const link =
//   //     window.location.protocol +
//   //     '//' +
//   //     window.location.host +
//   //     window.location.pathname +
//   //     '?roomID=' +
//   //     roomID;

//   //   const msg = {
//   //     senderId: appointmentData.id,
//   //     receiverId: appointmentData.userId,
//   //     text: link,
//   //   };
//   //   sendMessageToServer(msg);

//   //   zpInstance.joinRoom({
//   //     sharedLinks: [
//   //       {
//   //         name: 'Personal link',
//   //         url: link,
//   //       },
//   //     ],
//   //     scenario: {
//   //       mode: ZegoUIKitPrebuilt.OneONoneCall,
//   //     },
//   //   });
//   // };

//   return <div ref={myMeeting}></div>;
// }

// export default VideoCalls;




import React, { useState, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars =
    '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  var maxPos = chars.length;
  var i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function VideoCalls() {
  const { appointment } = useParams();
  const [personalLink, setPersonalLink] = useState(null);
  const sock = useRef();
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const appointmentData = JSON.parse(decodeURIComponent(appointment));

  const connect = () => {
    sock.current = new SockJS('https://mediconnects.online/ws');
    const temp = over(sock.current);
    setStompClient(temp);
    temp.connect({}, onConnect, onErr);
  };

  const onErr = (error) => {
    console.log('on Error', error);
  };

  const onConnect = () => {
    setConnected(true);
  };

  useEffect(() => {
    connect();

    return () => {
      stompClient?.disconnect();
    };
  }, []);

  const sendMessageToServer = (messages) => {
    if (stompClient) {
      stompClient.send('/app/videolink', {}, JSON.stringify(messages));
    }
  };
  const myMeeting = async () => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    
    const appID = 336316424;
    const serverSecret = '15db26c900a7105bc13029127742eae1';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );
  
    const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
  
    const link =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?roomID=' +
      roomID;
  
    const messages = {
      senderId: appointmentData.id,
      receiverId: appointmentData.userId,
      text: link,
    };
  
    await zpInstance.joinRoom({
      sharedLinks: [
        {
          name: 'Personal link',
          url: link,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  
    // Send the message to the server using the WebSocket connection
    sendMessageToServer(messages);
  };
  


  return <div ref={myMeeting}></div>;
}

export default VideoCalls;

