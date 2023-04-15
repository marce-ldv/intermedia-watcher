import { useReducer, createContext, useContext } from "react";
import { userReducer, userInitialState } from "./reducer";

export const UserContextDispatch = createContext(null);
export const UserContextState = createContext(null);

export const useUserReducer = () => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  return [state, dispatch];
};

export const useUserDispatch = () => {
  return useContext(UserContextDispatch);
};

export const useUserState = () => {
  return useContext(UserContextState);
};
