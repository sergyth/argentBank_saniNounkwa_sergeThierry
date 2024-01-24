import { loginFail, loginSuccess, logoutSuccess, isToken, userFail, userLogout, userSuccess, userUpdateFail, userUpdateSuccess } from "../app/redux";

const BASE_URL = "http://localhost:3001/api/v1";

const login = (email, password, rememberMe) => (dispatch) => {
    fetch(BASE_URL + "/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    })

    .then(data => {
        if (rememberMe) {
            localStorage.setItem("token", JSON.stringify(data.body.token));
        } else {
            sessionStorage.setItem("token", JSON.stringify(data.body.token));
        }
        dispatch(loginSuccess(data));
        return data;
    })
    .catch(err => {
        dispatch(loginFail(err.message));
    });
}

const userProfile = (value_token) => (dispatch) => {
    const token = localStorage.getItem("token") !== null ? localStorage.getItem("token").slice(1, -1) : value_token;
    fetch(BASE_URL + "/user/profile", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ token })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        dispatch(userSuccess(data));
        dispatch(isToken());
    })
    .catch(err => {
        dispatch(userFail(err));
    });
}

const updateProfile = (firstName, lastName, value_token) => (dispatch) => {
    const token = localStorage.getItem("token") !== null ? localStorage.getItem("token").slice(1, -1) : value_token;
    fetch(BASE_URL + "/user/profile", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        dispatch(userUpdateSuccess(data));
    })
    .catch(err => {
        dispatch(userUpdateFail(err));
    });
}

const logout = () => (dispatch) => {
    sessionStorage.clear();
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    dispatch(userLogout())
    console.log('logout')
}

export const auth_service = { login, logout, userProfile, updateProfile };
