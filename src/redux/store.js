import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./features/authSlice"
import AdminReducer from "./features/adminSlice"
import DoctorReducer from "./features/doctorSlice"

export default configureStore({
    reducer: {
        auth: AuthReducer,
        admin: AdminReducer,
        doctor: DoctorReducer
    }
})