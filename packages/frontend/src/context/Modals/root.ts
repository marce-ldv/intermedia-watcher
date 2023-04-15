import { useReducer, createContext, useContext } from "react";
import { modalReducer, modalInitialState } from "./reducer";

export const ModalContextDispatch = createContext(null);
export const ModalContextState = createContext(null);

export const useModalReducer = () => {
  const [state, dispatch] = useReducer(modalReducer, modalInitialState);

  return [state, dispatch];
};

export const useModalDispatch = () => {
  return useContext(ModalContextDispatch);
};

export const useModalState = () => {
  return useContext(ModalContextState);
};
