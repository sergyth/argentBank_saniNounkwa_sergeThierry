import {
  loginFail,
  loginSuccess,
  logoutSuccess,
  isToken,
  userFail,
  userLogout,
  userSuccess,
  userUpdateFail,
  userUpdateSuccess,
} from '../app/redux';

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
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
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
      dispatch(loginFail(err.message));
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
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(userSuccess(data));
      //dispatch(isToken());
    })
    .catch((err) => {
      dispatch(userFail(err.message));
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
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      dispatch(userUpdateSuccess(data));
    })
    .catch((err) => {
      dispatch(userUpdateFail(err.message));
    });
};

const logout = () => (dispatch) => {
    dispatch(logoutSuccess());
  sessionStorage.clear();
  localStorage.removeItem('token');
  //dispatch(userLogout());
};

export const auth_service = { login, logout, userProfile, updateProfile };
