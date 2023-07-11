import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('admin'))?.token
const AdminPrivateRoutes = () => {
    // if(Token){
        // let auth = { 'token': true }
    return(
        token ? <Outlet/> : <Navigate to = '/adminLogin'/>
    )
}


export default AdminPrivateRoutes