import { type Reducer } from "react";

import { type CookieValueTypes, getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

import * as actionTypes from "~/context/User/actions";

const token = (getCookie("token") as string | null) ?? null;

const user = {
  username: "",
  email: "",
  role: "",
};

type TokenPayload = {
  payload: { username: string; email: string; role: string };
};

if (token) {
  const { payload } = jwtDecode<TokenPayload>(token);
  user.username = payload.username;
  user.email = payload.email;
  user.role = payload.role;
}

export interface User {
  username: string;
  email: string;
  role: string;
}

export interface UserState {
  user: User;
  token: CookieValueTypes;
}

export interface UserAction {
  type: symbol;
  payload?: User | CookieValueTypes | null;
}

export const userInitialState: UserState = {
  user,
  token,
};

export const userReducer: Reducer<UserState, UserAction> = (
  state,
  action: UserAction
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload as User,
      };
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload as CookieValueTypes,
      };
    case actionTypes.RESET_USER_DATA:
      return {
        ...state,
        user: {
          username: "",
          email: "",
          role: "",
        },
        token: null,
      };
    default:
      return state;
  }
};
