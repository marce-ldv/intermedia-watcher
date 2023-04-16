import { Modal } from "flowbite-react";

import { LoginForm } from "~/components/organisms/LoginForm";
import { setToggle } from "~/context/Modals/actions";
import { useModalDispatch, useModalState } from "~/context/Modals/root";

const Login = () => {
  const { show } = useModalState();
  const dispatch = useModalDispatch();

  const handleCloseModal = () => {
    dispatch(setToggle(false));
  };

  return (
    <Modal show={show} onClose={handleCloseModal} title="LogIn">
      <Modal.Header>Log In</Modal.Header>
      <Modal.Body>
        <LoginForm />
      </Modal.Body>
    </Modal>
  );
};

export default Login;
