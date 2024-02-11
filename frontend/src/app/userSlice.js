import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email:null,
    firstName:null,
    lastName:null,
    id:null,
    error:null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserProfile: (state, action) => {
            const { email, firstName, lastName, id } = action.payload.body;
            state.email = email;
            state.firstName = firstName;
            state.lastName = lastName;
            state.id = id;
          },
   
        clearUserProfile: (state) => {
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.id = null;
          },

        updateUserName: (state, action)=>{
            const {  firstName, lastName } = action.payload.body;
            state.firstName = firstName;
            state.lastName = lastName;
        },

        setUserError: (state, action) => {
            state.error = action.payload.body;
          },
    }
})

export const { setUserProfile, clearUserProfile, updateUserName, setUserError } = userSlice.actions;

export const userReducer = userSlice.reducer;

