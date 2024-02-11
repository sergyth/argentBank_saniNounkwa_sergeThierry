import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:null || localStorage.getItem('token'),
    isAuth: false,
    error:null,  
}

const loginSlice= createSlice({
    name:"login",
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.token = action.payload.body;
            state.isAuth = true;
            state.error = null;
        },

        loginFailure: (state, action) =>{
            state.isAuth = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;    
        },

    }
})

export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

export const loginReducer= loginSlice.reducer ;