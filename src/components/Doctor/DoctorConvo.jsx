import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../axios/services/HomeServices'
import '../../components/Messenger/conversations/Conversation'

const DoctorConvo = ({conversation, currentUser}) => {

    const [user, setUser] = useState(null)
    
    console.log(user)
    useEffect(() => {
      const userId = conversation.members.find((m) => m !== currentUser.id)
      
      const getUser = async () => {
        const token = JSON.parse(localStorage.getItem('doctor')).token
        const res = await getUserProfile(token, userId)
        setUser(res.userProfile)
      }
      getUser();
    }, [currentUser, conversation])
    
    return (
      <div className="conversation">
          <img className='conversationImg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile-pic" srcset="" />
          <span className='conversationName'>{user?.firstname} {user?.lastname}</span>
      </div>
    )
  }

export default DoctorConvo