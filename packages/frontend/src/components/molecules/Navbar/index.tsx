import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Modal,
  Navbar,
} from "flowbite-react";
import Image from "next/image";
import { removeCookies } from "cookies-next";
import { useState } from "react";
import { LoginForm } from "~/components/organisms/LoginForm";
import { RegisterForm } from "~/components/organisms/RegisterForm";
import { useUserDispatch, useUserState } from "~/context/User/root";
import { useRouter } from "next/router";
import { resetUserData } from "~/context/User/actions";

const useNavbar = () => {
  const { token, user } = useUserState();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
  const dispatch = useUserDispatch();

  const handleLogout = async () => {
    removeCookies("token");
    dispatch(resetUserData());
    await router.push("/");

    if(isOpen) setIsOpen(false);
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleOpenModalRegister = () => setIsOpenRegister(true);
  const handleCloseModalRegister = () => setIsOpenRegister(false);

  return {
    user,
    isLoggedIn: Boolean(token),
    isOpen,
    isOpenRegister,
    isAdmin: user?.role === "admin",
    handleLogout,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalRegister,
    handleCloseModalRegister,
  };
};

export const CustomNavbar = () => {
  const navProps = useNavbar();

  return (
    <>
      <Navbar
        fluid={true}
        rounded={false}
        className="bg-white-800 dark:bg-gray-800"
      >
        <Navbar.Brand href="/">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 sm:h-9"
            width={100}
            height={100}
            alt="logo"
          />
          <span className="self-center whitespace-nowrap font-semibold dark:text-white">
            Intermedia Watcher
          </span>
        </Navbar.Brand>

        <div className="flex items-center space-x-4 md:order-3 md:ml-4">
          <Navbar.Collapse>
            <Navbar.Link href="/" active={true}>
              Home
            </Navbar.Link>
            {navProps.isAdmin ? (
              <Navbar.Link href="/create-coin">Create coin</Navbar.Link>
            ) : null}
            <Navbar.Link href="/about">About us</Navbar.Link>
          </Navbar.Collapse>

          <DarkThemeToggle />

          {Boolean(!navProps.isLoggedIn) ? (
            <Button onClick={navProps.handleOpenModal}>LogIn</Button>
          ) : null}
          {navProps.isAdmin ? (
            <Button onClick={navProps.handleOpenModalRegister}>Sign Up</Button>
          ) : null}

          {navProps.isLoggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{navProps.user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {navProps.user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={navProps.handleLogout}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          ) : null}
          <Navbar.Toggle />
        </div>
      </Navbar>

      <Modal
        show={navProps.isOpen}
        onClose={navProps.handleCloseModal}
        title="LogIn"
      >
        <Modal.Header>Log In</Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>

      <Modal
        show={navProps.isOpenRegister}
        onClose={navProps.handleCloseModalRegister}
        title="Register"
      >
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
