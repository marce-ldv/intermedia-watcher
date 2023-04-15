import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import { getCookie } from "cookies-next";

export function useGetUser() {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string | any>("");
  const isLoggedIn = user ? Object.keys(user).length : false;
  const isAdmin = isLoggedIn && user?.role === "admin";

  useEffect(() => {
    const tokenCookie = getCookie("token");
    if (tokenCookie) {
      setToken(tokenCookie);

      const tokenDecode = jwtDecode(tokenCookie) || null;
      setUser(tokenDecode?.payload);
    }
  }, []);

  return {
    user,
    token,
    isLoggedIn,
    isAdmin,
  };
}
