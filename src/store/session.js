// frontend/src/store/session.js

import { csrfFetch } from './csrf';

// Defined Action Types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// Action Types
// These constants represent the action types for setting and removing a user session.
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};
const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

// Default No User Session
const noUser = { user: null };

// Restore Session
// This function checks if a user is logged in by sending a GET request to the session endpoint.
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
// Sign Up
// This function handles user sign up by sending a POST request to the users endpoint with the user's information.
  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
// Login
// This function handles user login by sending a POST request to the session endpoint with the user's credentials.
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
// Logout
// This function handles user logout by sending a DELETE request to the session endpoint.
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };


  // sessionReducer
  // This reducer manages the session state, including the current user.
const sessionReducer = (state = noUser, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// Exporting the session reducer and action creators
export default { sessionReducer, setUser, removeUser, restoreUser, signup, login, logout };