import React, { useEffect, useState } from 'react'
import { getDoctorProfile } from '../../../axios/services/DoctorServices'
import './Conversation.css'

const Conversation = ({conversation, currentUser}) => {

  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const docId = conversation.members.find((m) => m !== currentUser._id)
    
    const getDoctor = async () => {
      const token = localStorage.getItem('user')
      const res = await getDoctorProfile(token, docId)
      setDoctor(res.doctorProfile)
    }
    getDoctor();
  }, [ conversation])
  
  return (
    <div className="conversation">
        <img className='conversationImg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile-pic" srcset="" />
        <span className='conversationName'>{doctor?.firstname} {doctor?.lastname}</span>
    </div>
  )
}

export default Conversation