import { Modal } from "flowbite-react";
import { useModalDispatch, useModalState } from "~/context/Modals/root";
import { setToggle } from "~/context/Modals/actions";
import { RegisterForm } from "~/components/organisms/RegisterForm";

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
