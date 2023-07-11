import { useEffect, useState } from "react";
import { findConvo, getBookedDoctors, newConversation } from "../../../axios/services/ConversationServices";
import "./ChatBooked.css";

const ChatBooked = ({ bookedDoctors, currentUser, setCurrentChat }) => {
  const [doctors, setDoctors] = useState([]);
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    const getBooked = async () => {
      const res = await getBookedDoctors(currentUser);
      console.log(res.bookedDoctors);
      console.log("above is res");
      setDoctors(res.bookedDoctors);
    };
    getBooked();
  }, [currentUser]);

  console.log(doctors);

  useEffect(() => {
    setBooked(doctors);
  }, [doctors]);

  const handleClick = async (doc) => {
    // const res = await findConvo(currentUser, doc.doctorId)
    // if(res.conversation !== null){
    //   console.log(res.conversation)
    //   return setCurrentChat(res.conversation)
    // }else{
      const res = await newConversation(currentUser, doc.doctorId)
      console.log(res)
      return setCurrentChat(res.conversation)
    }
  // }

  return (
    <div className="chatBooked">
      {doctors?.map((doc) => {
        return (
          <div className="chatBookedDoctor" onClick={() => handleClick(doc)}>
            <div className="chatBookedImgContainer">
              <img
                className="chatBookedImg"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
              <div className="chatBookedBadge"></div>
            </div>
            <span className="chatBookedName">{doc?.doctorInfo}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBooked;
