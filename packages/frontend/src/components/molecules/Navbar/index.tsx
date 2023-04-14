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
import { useGetUser } from "~/hooks/useGetUser";
import { useState } from "react";
import { LoginForm } from "~/components/organisms/LoginForm";
import { RegisterForm } from "~/components/organisms/RegisterForm";

const useNavbar = () => {
  const { user, isLoggedIn } = useGetUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookies("token");
    window.location.href = "/login";
  };

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleOpenModalRegister = () => setIsOpenRegister(true);
  const handleCloseModalRegister = () => setIsOpenRegister(false);

  return {
    handleLogout,
    user,
    isLoggedIn,
    handleOpenModal,
    handleCloseModal,
    isOpen,
    handleOpenModalRegister,
    handleCloseModalRegister,
    isOpenRegister,
  };
};

export const CustomNavbar = () => {
  const {
    handleLogout,
    user,
    isLoggedIn,
    handleOpenModal,
    handleCloseModal,
    isOpen,
    handleOpenModalRegister,
    handleCloseModalRegister,
    isOpenRegister,
  } = useNavbar();

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
            <Navbar.Link href="/create-coin">Create coin</Navbar.Link>
            <Navbar.Link href="/about">About us</Navbar.Link>
          </Navbar.Collapse>

          <DarkThemeToggle />

          <Button onClick={handleOpenModalRegister}>Register</Button>
          {Boolean(!isLoggedIn) ? (
            <Button onClick={handleOpenModal}>LogIn</Button>
          ) : null}

          {isLoggedIn ? (
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
                <span className="block text-sm">{user.username}</span>
                <span className="block truncate text-sm font-medium">
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : null}
          <Navbar.Toggle />
        </div>
      </Navbar>

      <Modal show={isOpen} onClose={handleCloseModal} title="LogIn">
        <Modal.Header>
          Log In
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>

      <Modal
        show={isOpenRegister}
        onClose={handleCloseModalRegister}
        title="Register"
      >
        <Modal.Header>
          Sign Up
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
      </Modal>
    </>
  );
};
