import { useReducer, createContext, useContext, type Dispatch } from "react";

import { type UserAction } from "~/context/User/reducer";

import {
  modalReducer,
  modalInitialState,
  type ModalReducer,
  type ModalState,
  type ModalAction,
} from "./reducer";

export const ModalContextDispatch = createContext<Dispatch<UserAction> | null>(
  null
);
export const ModalContextState = createContext<ModalState>(modalInitialState);

export const useModalReducer = (): [ModalState, Dispatch<ModalAction>] => {
  const [state, dispatch] = useReducer<ModalReducer>(
    modalReducer,
    modalInitialState
  );

  return [state, dispatch];
};

export const useModalDispatch = () => {
  return useContext(ModalContextDispatch) as Dispatch<ModalAction | null>;
};

export const useModalState = () => {
  return useContext(ModalContextState);
};
