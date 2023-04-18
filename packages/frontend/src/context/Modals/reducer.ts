import { type Reducer } from "react";

import * as actionTypes from "~/context/Modals/actions";

export interface ModalState {
  route: string;
  show: boolean;
  data: {
    id?: string;
  };
}

export interface ModalAction {
  type: symbol;
  payload?: any;
}

export type ModalReducer = Reducer<ModalState, ModalAction>;

export const modalInitialState = {
  route: "",
  show: false,
  data: {},
};

export const modalReducer: ModalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_ROUTE:
      return {
        ...state,
        route: action.payload as string,
      };
    case actionTypes.SET_TOGGLE:
      return {
        ...state,
        show: action.payload as boolean,
      };
    case actionTypes.SET_MODAL_DATA:
      return {
        ...state,
        data: action.payload as object,
      };
    default:
      return state;
  }
};
