import axios from "~/config/instance";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type TypeUserRegister = { email: string; password: string, name: string, role: string };

const useRegister = () => {
  const router = useRouter();
  const registerUser = async (data: TypeUserRegister): Promise<void> => {
    const response = await axios.post("api/register", data);

    if (!response) {
      throw new Error("Failed to register");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    localStorage.setItem("token", response.data.token);
    await router.push("/");
  };
  return {
    registerUser,
  };
};

export const RegisterForm = () => {
  const { registerUser } = useRegister();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data: TypeUserRegister) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your username" />
          <TextInput
            id="username"
            type="text"
            placeholder="username"
            required={true}
            {...register("username")}
          />
        </div>
      </div>
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Your role" />
          <Select id="role" required={true} {...register("role")}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
      </div>
      <Button type="submit">Sign up</Button>
    </form>
  );
};
