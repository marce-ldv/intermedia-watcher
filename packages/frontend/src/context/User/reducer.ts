import * as actionTypes from "~/context/User/actions";
import {getCookie} from "cookies-next";
import jwtDecode from "jwt-decode";

const token = getCookie('token') ?? null;

const user = {
  username: '',
  email: '',
  role: '',
};

if (token) {
  const { payload } = jwtDecode(token);
  user.username = payload.username;
  user.email = payload.email;
  user.role = payload.role;
}

export const userInitialState = {
  user,
  token,
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
      case actionTypes.RESET_USER_DATA:
      return {
        ...state,
        user: {
          username: '',
          email: '',
          role: '',
        },
        token: null,
      };
    default:
      return state;
  }
}
