import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import { getCookie } from "cookies-next";

export function useGetUser() {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string | any>("");
  const isLoggedIn = Object.keys(user).length;
  const isAdmin = isLoggedIn && user?.role === "admin";

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setToken(token);

      const tokenDecode = jwtDecode(token) || null;
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
