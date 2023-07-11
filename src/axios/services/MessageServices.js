import { axiosMessageInstance } from "../axios"


export const getMessages = async (convoId) => {
    const {data} = await axiosMessageInstance.get(`/getMessages/${convoId}`)
    if(data.status){
        return data;
    }
}

export const sendNewMessage = async (message) => {
    console.log(message)
    const {data} = await axiosMessageInstance.post(`/newMessage`,message)
    if(data.status){
        return data;
    }
}