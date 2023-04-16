import { removeCookies } from "cookies-next";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
} from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";

import { MODAL_ROUTES } from "~/components/organisms/Modals";
import { setRoute, setToggle } from "~/context/Modals/actions";
import { useModalDispatch } from "~/context/Modals/root";
import { resetUserData } from "~/context/User/actions";
import { useUserDispatch, useUserState } from "~/context/User/root";

const useNavbar = () => {
  const { token, user } = useUserState();
  const router = useRouter();
  const dispatch = useUserDispatch();
  const modalDispatch = useModalDispatch();

  const handleLogout = () => {
    removeCookies("token");
    dispatch(resetUserData());
    void router.push("/");
  };

  const handleLoginModal = () => {
    modalDispatch(setToggle(true));
    modalDispatch(setRoute(MODAL_ROUTES.LOGIN));
  };

  const handleRegisterModal = () => {
    modalDispatch(setToggle(true));
    modalDispatch(setRoute(MODAL_ROUTES.REGISTER));
  };

  return {
    user,
    isLoggedIn: Boolean(token),
    isAdmin: user?.role === "admin",
    handleLogout,
    handleLoginModal,
    handleRegisterModal,
  };
};

export const CustomNavbar = () => {
  const {
    user,
    isLoggedIn,
    isAdmin,
    handleLogout,
    handleLoginModal,
    handleRegisterModal,
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
              <Navbar.Link href="/coin/create">Create coin</Navbar.Link>
            ) : null}
            <Navbar.Link href="/about">About us</Navbar.Link>
          </Navbar.Collapse>

          <DarkThemeToggle />

          {Boolean(!isLoggedIn) ? (
            <Button onClick={handleLoginModal}>LogIn</Button>
          ) : null}
          {isAdmin ? (
            <Button onClick={handleRegisterModal}>Sign Up</Button>
          ) : null}

          {isLoggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="User settings"
                  img="/images/profile.jpg"
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
    </>
  );
};
