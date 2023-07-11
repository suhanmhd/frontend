import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { adminLogin } from '../../axios/services/HomeServices'

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        error: "",
        loading: false
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setLogout: (state, action) => {
            localStorage.removeItem('admin');
            state.admin = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.pending = true
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                console.log('hii')
                state.pending = false
                localStorage.setItem("admin", JSON.stringify({ ...action.payload }))
                state.admin = action.payload
                // state.success = action.payload
            })
            .addCase(adminLogin.rejected, (state, action) => {
                console.log('in slice error');
                state.pending = false
                state.error = action.payload.message
            })
    }
        // [adminRegister.pending]: (state, action) => {
        //     state.loading = true
        // },
        // [adminRegister.fulfilled]: (state, action) => {
        //     state.loading = false
        //     localStorage.setItem("admin", JSON.stringify({...action.payload}))
        //     state.admin = action.payload
        // },
        // [adminRegister.rejected]: (state, action) => {
        //     state.loading = false
        //     state.error = action.payload.message
        // }
    // }
})
export const { setAdmin, setLogout } = adminSlice.actions;

export default adminSlice.reducer;