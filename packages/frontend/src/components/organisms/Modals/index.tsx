import Login from "~/components/organisms/Modals/Login";
import Register from "~/components/organisms/Modals/Register";
import { useModalState } from "~/context/Modals/root";

export const MODAL_ROUTES = {
  LOGIN: "login",
  REGISTER: "register",
  CREATE_COIN: "create-coin",
  DELETE_COIN: "delete-coin",
  EDIT_COIN: "edit-coin",
};

export const Modals = () => {
  const { route } = useModalState();

  const getModal = () => {
    switch (route) {
      case MODAL_ROUTES.LOGIN:
        return <Login />;
      case MODAL_ROUTES.REGISTER:
        return <Register />;
      default:
        return null;
    }
  };
  return getModal();
};
