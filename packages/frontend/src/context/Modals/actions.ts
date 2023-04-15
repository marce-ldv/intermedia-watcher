const actionCreator =
  (type) =>
    (payload = null) => ({
      type,
      payload,
    });

export const SET_ROUTE = Symbol("SET ROUTE");
export const setRoute = actionCreator(SET_ROUTE);

export const SET_TOGGLE = Symbol("SET TOGGLE");
export const setToggle = actionCreator(SET_TOGGLE);
