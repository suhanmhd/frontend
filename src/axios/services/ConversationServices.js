import { axiosConversationInstance } from "../axios"


export const getConversations = async (userId) => {
    const {data} = await axiosConversationInstance.get(`/getConvo/${userId}`)
    if(data.status){
        return data;
    }
}

export const getBookedDoctors = async (userId) => {
    const {data} = await axiosConversationInstance.get(`/getBookedDoctors/${userId}`)
    if(data.status){
        return data;
    }
}

export const findConvo = async (firstUser, secondUser) => {
    const {data} = await axiosConversationInstance.get(`/findConvo/${firstUser}/${secondUser}`)
    if(data.status){
        return data;
    }
}

export const newConversation = async (firstUser, secondUser) => {
    const {data} = await axiosConversationInstance.post(`/newConvo/${firstUser}/${secondUser}`)
    if(data){
        return data;
    }
}
