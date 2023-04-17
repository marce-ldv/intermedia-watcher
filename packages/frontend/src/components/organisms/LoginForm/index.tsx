import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginSchema } from "~/components/organisms/LoginForm/validations";
import axios from "~/config/instance";
import { setToggle } from "~/context/Modals/actions";
import { useModalDispatch } from "~/context/Modals/root";
import { setToken } from "~/context/User/actions";
import { useUserDispatch } from "~/context/User/root";

type TypeUserAuth = { email: string; password: string };
type UserLoginResponse = {
  token: string;
  user: { id: string; email: string; role: string };
};

const useAuth = () => {
  const router = useRouter();
  const dispatch = useUserDispatch();
  const modalDispatch = useModalDispatch();

  const loginRepository = async (data: TypeUserAuth): Promise<void> => {
    try {
      const response = await axios.post<UserLoginResponse>("api/login", data);

      if (!response) {
        throw new Error("Failed to login");
      }

      dispatch(setToken(response.data.token));
      modalDispatch(setToggle(false));
      toast.success("User logged in successfully");
      await router.push("/");
    } catch (error) {
      toast.error("Failed to login");
    }
  };
  return {
    loginRepository,
  };
};

export const LoginForm = () => {
  const { loginRepository } = useAuth();
  const { handleSubmit, register, formState } = useForm<TypeUserAuth>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(loginSchema),
  });
  console.log(formState.errors);

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
          color={formState.errors.email ? "failure" : ""}
          helperText={formState.errors.email?.message}
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
          color={formState.errors.password ? "failure" : ""}
          helperText={formState.errors.password?.message}
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
};
