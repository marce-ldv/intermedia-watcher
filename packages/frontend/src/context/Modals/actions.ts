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

export const SET_MODAL_DATA = Symbol("SET MODAL DATA");
export const setModalData = actionCreator(SET_MODAL_DATA);

