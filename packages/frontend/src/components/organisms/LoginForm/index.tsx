import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput } from "flowbite-react";
import {useRouter} from "next/router";

type TypeUserAuth = { email: string; password: string }

const useAuth = () => {
  const router = useRouter()
  const login = async (data: TypeUserAuth): Promise<void> => {
    const response = await axios.post("api/login", data);

    if (!response) {
      throw new Error("Failed to login");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    localStorage.setItem("token", response.data.token);
    await router.push("/")
  };
  return {
    login,
  };
};

export const LoginForm = () => {
  const { login } = useAuth();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: TypeUserAuth) => {
    try {
      await login(data);
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
