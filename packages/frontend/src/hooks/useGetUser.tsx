import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import { getCookie } from "cookies-next";

export function useGetUser() {
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string>("");

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
    isLoggedIn: Object.keys(user).length,
  };
}
