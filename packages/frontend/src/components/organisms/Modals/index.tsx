import { useModalState } from "~/context/Modals/root";
import Login from "~/components/organisms/Modals/Login";

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
      // case MODAL_ROUTES.REGISTER:
      //   return <RegisterForm onClose={onClose} />;
      // case MODAL_ROUTES.CREATE_COIN:
      //   return <CreateCoinForm onClose={onClose} />;
      // case MODAL_ROUTES.DELETE_COIN:
      //   return <DeleteCoinForm onClose={onClose} />;
      // case MODAL_ROUTES.EDIT_COIN:
      //   return <EditCoinForm onClose={onClose} />;
      default:
        return null;
    }
  };
    return getModal();
};
