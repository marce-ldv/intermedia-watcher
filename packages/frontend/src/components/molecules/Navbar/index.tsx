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
import { useModalDispatch } from "~/context/Modals/root";
import {setRoute, setToggle} from "~/context/Modals/actions";
import {MODAL_ROUTES} from "~/components/organisms/Modals";

const useNavbar = () => {
  const { token, user } = useUserState();
  const router = useRouter();
  const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
  const dispatch = useUserDispatch();
  const modalDispatch = useModalDispatch();

  const handleLogout = async () => {
    removeCookies("token");
    dispatch(resetUserData());
    await router.push("/");
  };

  const handleLoginModal = () => {
    modalDispatch(setToggle(true));
    modalDispatch(setRoute(MODAL_ROUTES.LOGIN));
  };

  const handleOpenModalRegister = () => setIsOpenRegister(true);
  const handleCloseModalRegister = () => setIsOpenRegister(false);

  return {
    user,
    isLoggedIn: Boolean(token),
    isOpenRegister,
    isAdmin: user?.role === "admin",
    handleLogout,
    handleLoginModal,
    handleOpenModalRegister,
    handleCloseModalRegister,
  };
};

export const CustomNavbar = () => {
  const {
    user,
    isLoggedIn,
    isOpenRegister,
    isAdmin,
    handleLogout,
    handleLoginModal,
    handleOpenModalRegister,
    handleCloseModalRegister,
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
            {isAdmin ? (
              <Navbar.Link href="/create-coin">Create coin</Navbar.Link>
            ) : null}
            <Navbar.Link href="/about">About us</Navbar.Link>
          </Navbar.Collapse>

          <DarkThemeToggle />

          {Boolean(!isLoggedIn) ? (
            <Button onClick={handleLoginModal}>LogIn</Button>
          ) : null}
          {isAdmin ? (
            <Button onClick={handleOpenModalRegister}>Sign Up</Button>
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

      <Modal
        show={isOpenRegister}
        onClose={handleCloseModalRegister}
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
