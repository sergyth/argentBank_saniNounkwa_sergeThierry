import {
  setUserProfile, clearUserProfile, updateUserName, setUserError
} from '../app/userSlice';

import {
  loginFailure,
  loginSuccess,
  logout,
} from '../app/loginSlice';

const BASE_URL = 'http://localhost:3001/api/v1';

const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const login = (email, password, rememberMe) => (dispatch) => {
  fetch(BASE_URL + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response, maybe network error');
      }
      return response.json();
    })
    .then((data) => {
      if (rememberMe) {
        localStorage.setItem('token', data.body.token);
      } else {
        sessionStorage.setItem('token', data.body.token);
      }
      dispatch(loginSuccess(data));
    })
    .catch((err) => {
      dispatch(loginFailure(err.message));
    });
};

const userProfile = () => (dispatch) => {
  const token = getToken();
  fetch(BASE_URL + '/user/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response, maybe network error');
      }
      return response.json();
    })
    .then((data) => {
      
      dispatch(setUserProfile(data));
    })
    .catch((err) => {
      if (err.message.includes('401')) {
        return;
      } else {
        
        dispatch(setUserError(err.message));
      }
    });
};

const updateProfile = (firstName, lastName) => (dispatch) => {
  const token = getToken();
  fetch(BASE_URL + '/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('No response, maybe network error');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(updateUserName(data));
    })
    .catch((err) => {
      dispatch(setUserError(err.message));
    });
};

const log_out = () => (dispatch) => {

  dispatch(logout());
  dispatch(clearUserProfile());

};

export const auth_service = { login, log_out, userProfile, updateProfile };
