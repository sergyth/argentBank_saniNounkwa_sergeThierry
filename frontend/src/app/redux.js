import { createSlice } from "@reduxjs/toolkit";

//Initial login state
const loginState={
    token:localStorage.getItem("token"),
    isAuth: false,
    error:null,
   
}

//Login slices
const loginSlice= createSlice({
    name:"login",
    initialState:loginState,
    reducers:{
        loginSuccess: (state, action) => {
            state.token=action.payload.body.token;
            state.isAuth=true;
            state.error=null;
        },

        loginFail: (state, action) =>{
            state.token = null;
            state.isAuth = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.token = null;
            state.isAuth = false;
            state.error = null;
        },

        // isToken: (state) => {
        //     state.isAuth=true;
        // },
        
    }
})


//Initial user state
const userState={
    email:null,
    firstName:null,
    lastName:null,
    id:null,
    error:null,
}

//User slices
const userSlice = createSlice({
    name:"user",
    initialState:userState,
    reducers:{
        userSuccess: (state, action) => {
            state.email=action.payload.body.email;
            state.firstName=action.payload.body.firstName;
            state.lastName=action.payload.body.lastName;
            state.id=action.payload.body.id;
            state.error=null;
        },
        userFail: (state, action) => {
            state.email=null;
            state.firstName=null;
            state.lastName=null;
            state.id=null;
            state.error=action.payload.message
        },
        userLogout: (state) => {
            state.email=null;
            state.firstName=null;
            state.lastName=null;
            state.id=null;
            state.error=null;
        },
        userUpdateSuccess: (state, action)=>{
            state.email=action.payload.body.email;
            state.firstName=action.payload.body.firstName;
            state.lastName=action.payload.body.lastName;
            state.id=action.payload.body.id;
            state.error=null;
        },
        userUpdateFail: (state, action) =>{
            state.email=action.payload.body.email;
            state.firstName=action.payload.body.firstName;
            state.lastName=action.payload.body.lastName;
            state.id=action.payload.body.id;
            state.error=action.payload.message;
        }
    }
})

export const { userSuccess, userFail, userLogout, userUpdateSuccess, userUpdateFail } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const { loginSuccess, loginFail, logoutSuccess, /*isToken, logoClick*/ } = loginSlice.actions;

export const loginReducer= loginSlice.reducer ;