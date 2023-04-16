import type { CookieValueTypes } from "cookies-next";

import type { User, UserAction } from "~/context/User/reducer";

const actionCreator =
  <TPayload extends CookieValueTypes | User>(type: symbol) =>
  (payload?: TPayload): UserAction => ({
    type,
    payload,
  });

export const SET_USER = Symbol("SET USER");
export const setUser = actionCreator<User>(SET_USER);

export const SET_TOKEN = Symbol("SET TOKEN");
export const setToken = actionCreator<CookieValueTypes>(SET_TOKEN);

export const RESET_USER_DATA = Symbol("RESET USER DATA");
export const resetUserData = actionCreator(RESET_USER_DATA);
