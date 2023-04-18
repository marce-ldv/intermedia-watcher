import {
  useReducer,
  createContext,
  useContext,
  type Reducer,
  type Dispatch,
} from "react";

import {
  userReducer,
  userInitialState,
  type UserState,
  type UserAction,
} from "./reducer";

export const UserContextDispatch = createContext<Dispatch<UserAction> | null>(
  null
);
export const UserContextState = createContext<UserState>(userInitialState);

export const useUserReducer = (): [UserState, Dispatch<UserAction>] => {
  const [state, dispatch] = useReducer<Reducer<UserState, UserAction>>(
    userReducer,
    userInitialState
  );

  return [state, dispatch];
};

export const useUserDispatch = () => {
  return useContext(UserContextDispatch) as Dispatch<UserAction | null>;
};

export const useUserState = () => {
  return useContext(UserContextState);
};
