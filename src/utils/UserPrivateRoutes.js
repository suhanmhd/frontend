import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('user'))?.token

const UserPrivateRoutes = () => {
    // if(Token){
        // let auth = { 'token': true }
        console.log(token)
    return(
        token ? <Outlet/> : <Navigate to = '/login'/>
    )
}


export default UserPrivateRoutes