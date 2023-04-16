import { type ModalAction } from "~/context/Modals/reducer";

const actionCreator =
  <TPayload>(type: symbol) =>
  (payload?: TPayload): ModalAction => ({
    type,
    payload,
  });

export const SET_ROUTE = Symbol("SET ROUTE");
export const setRoute = actionCreator<string>(SET_ROUTE);

export const SET_TOGGLE = Symbol("SET TOGGLE");
export const setToggle = actionCreator<boolean>(SET_TOGGLE);

export const SET_MODAL_DATA = Symbol("SET MODAL DATA");
export const setModalData = actionCreator<object>(SET_MODAL_DATA);
