// Auth Actions Creator
// This is creator for actions related to authentication.
// We’re gonna import AuthService to make asynchronous
// HTTP requests with trigger one or more dispatch in the result.

// – register()
// calls the AuthService.register(email, password, firstName, lastName,
// country, stree, apt, city, state, zip, phone)
// dispatch REGISTER_SUCCESS and SET_MESSAGE if successful
// dispatch REGISTER_FAIL and SET_MESSAGE if failed

// – login()
// calls the AuthService.login(email, password)
// dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
// dispatch LOGIN_FAIL and SET_MESSAGE if failed
// Both action creators return a Promise for Components using them.

//Both action creators return a Promise for Components using them.
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../../services/auth.service";

export const register =
  (
    email,
    password,
    firstName,
    lastName,
    country,
    street,
    apt,
    city,
    state,
    zip,
    phone
  ) =>
  (dispatch) => {
    return AuthService.register(
      email,
      password,
      firstName,
      lastName,
      country,
      street,
      apt,
      city,
      state,
      zip,
      phone
    ).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      const message =
        (data.response && data.response.data && data.response.data.message) ||
        data.message ||
        data.toString();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
