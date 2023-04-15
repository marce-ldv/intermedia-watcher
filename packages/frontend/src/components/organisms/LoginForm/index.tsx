import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useUserDispatch } from "~/context/User/root";
import { setToken } from "~/context/User/actions";

type TypeUserAuth = { email: string; password: string };

const useAuth = () => {
  const router = useRouter();
  const dispatch = useUserDispatch();

  const loginRepository = async (data: TypeUserAuth): Promise<void> => {
    const response = await axios.post("api/login", data);

    if (!response) {
      throw new Error("Failed to login");
    }

    dispatch(setToken(response.data.token));
    await router.push("/");
  };
  return {
    loginRepository,
  };
};

export const LoginForm = () => {
  const { loginRepository } = useAuth();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: TypeUserAuth) => {
    try {
      await loginRepository(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
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
