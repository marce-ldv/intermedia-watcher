import { Modal } from "flowbite-react";

import { RegisterForm } from "~/components/organisms/RegisterForm";
import { setToggle } from "~/context/Modals/actions";
import { useModalDispatch, useModalState } from "~/context/Modals/root";

const Register = () => {
  const { show } = useModalState();
  const dispatch = useModalDispatch();

  const handleCloseModal = () => {
    dispatch(setToggle(false));
  };

  return (
    <Modal show={show} onClose={handleCloseModal} title="SignUp">
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Body>
        <RegisterForm />
      </Modal.Body>
    </Modal>
  );
};

export default Register;
