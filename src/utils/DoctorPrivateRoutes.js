import { Outlet, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem('doctor'))?.token
const DoctorPrivateRoutes = () => {
    // if(Token){
        // let auth = { 'token': true }
    return(
        token ? <Outlet/> : <Navigate to = '/doctorLogin'/>
    )
}


export default DoctorPrivateRoutes