const actionCreator =
  (type) =>
    (payload = null) => ({
      type,
      payload,
    });

export const SET_USER = Symbol("SET USER");
export const setUser = actionCreator(SET_USER);

export const SET_TOKEN = Symbol("SET TOKEN");
export const setToken = actionCreator(SET_TOKEN);

export const RESET_USER_DATA = Symbol("RESET USER DATA");
export const resetUserData = actionCreator(RESET_USER_DATA);
