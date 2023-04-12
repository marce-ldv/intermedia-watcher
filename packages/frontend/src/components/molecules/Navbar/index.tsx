import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import { removeCookies } from "cookies-next";

const useNavbar = () => {
  const user = useLocalStorage("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookies("token");
    window.location.href = "/login";
  };

  return { handleLogout, user };
};

export const CustomNavbar = () => {
  const { handleLogout, user } = useNavbar();

  return (
    <Navbar
      fluid={true}
      rounded={false}
      className="bg-white-800 dark:bg-gray-800"
    >
      <Navbar.Brand href="https://flowbite.com/">
        <Image
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          width={100}
          height={100}
          alt="logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Intermedia Watcher
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
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
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
