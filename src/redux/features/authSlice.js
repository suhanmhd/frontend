import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../axios/services/HomeServices";

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: "",
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem('user');
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.pending = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                console.log('hii')
                state.pending = false
                localStorage.setItem("user", JSON.stringify({ ...action.payload }))
                state.user = action.payload
                // state.success = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log('in slice error');
                state.pending = false
                state.error = action.payload.message
            })
        // [register.pending]: (state, action) => {
        //     state.loading = true
        // },
        // [register.fulfilled]: (state, action) => {
        //     state.loading = false
        //     localStorage.setItem("profile", JSON.stringify({...action.payload}))
        //     state.user = action.payload
        // },
        // [register.rejected]: (state, action) => {
        //     state.loading = false
        //     state.error = action.payload.message
        // }
    }
})

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;