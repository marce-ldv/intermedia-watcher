import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";

export function useLocalStorage(key: string) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    isLoggedIn: false,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwt = localStorage.getItem(key);

      if (!jwt) return;

      const { payload } = jwtDecode(jwt);

      setUser({
        username: payload.username,
        email: payload.email,
        isLoggedIn: true,
      })
    }
  }, [key]);

  return user;
}
