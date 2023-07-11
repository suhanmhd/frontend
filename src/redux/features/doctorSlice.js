import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { doctorLogin } from "../../axios/services/HomeServices";

const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctor: null,
        error: "",
        loading: false
    },
    reducers: {
        setDoctor: (state, action) => {
            state.doctor = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem('doctor');
            state.doctor = null;
            toast.success("Logged out successfully")
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(doctorLogin.pending, (state, action) => {
            state.loading = true
        })
        .addCase(doctorLogin.fulfilled, (state, action) => {
            console.log(action.payload.token)
            const token=action.payload.token
            state.loading = false
          
            localStorage.setItem("doctor", JSON.stringify({ ...action.payload }))
            // localStorage.setItem("doctor", JSON.stringify({token}))
            state.doctor = action.payload
        })
        .addCase(doctorLogin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        // [doctorRegister.pending]: (state, action) => {
        //     state.loading = true
        // },
        // [doctorRegister.fulfilled]: (state, action) => {
        //     state.loading = false
        //     localStorage.setItem("profile", JSON.stringify({...action.payload}))
        //     state.doctor = action.payload
        // },
        // [doctorRegister.rejected]: (state, action) => {
        //     state.loading = false
        //     state.doctor = action.payload.message
        // }
    }
})

export const { setDoctor, setLogout } = doctorSlice.actions;

export default doctorSlice.reducer;