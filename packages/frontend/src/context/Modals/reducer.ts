import * as actionTypes from "~/context/Modals/actions";

export const modalInitialState = {
  route: "",
  show: false,
};

export const modalReducer = (state = modalInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        route: action.payload,
      };
    case actionTypes.SET_TOGGLE:
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
};
