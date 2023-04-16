import axios from "~/config/instance";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { setToggle } from "~/context/Modals/actions";
import { useModalDispatch } from "~/context/Modals/root";
import { setToken } from "~/context/User/actions";
import { useUserDispatch } from "~/context/User/root";

type TypeUserAuth = { email: string; password: string };
type UserLoginResponse = { token: string, user: { id: string, email: string, role: string } };

const useAuth = () => {
  const router = useRouter();
  const dispatch = useUserDispatch();
  const modalDispatch = useModalDispatch();

  const loginRepository = async (data: TypeUserAuth): Promise<void> => {
    const response = await axios.post<UserLoginResponse>("api/login", data);

    if (!response) {
      throw new Error("Failed to login");
    }

    dispatch(setToken(response.data.token));
    modalDispatch(setToggle(false));
    await router.push("/");
  };
  return {
    loginRepository,
  };
};

export const LoginForm = () => {
  const { loginRepository } = useAuth();
  const { handleSubmit, register } = useForm<TypeUserAuth>();

  const onSubmit = async (data: TypeUserAuth) => {
    try {
      await loginRepository(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="marce@test.com"
          required={true}
          {...register("email")}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required={true}
          {...register("password")}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
