import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerSchema } from "~/components/organisms/RegisterForm/validations";
import axios from "~/config/instance";

type TypeUserRegister = {
  email: string;
  password: string;
  username: string;
  role: string;
};

const useRegister = () => {
  const router = useRouter();
  const registerUser = async (data: TypeUserRegister): Promise<void> => {
    try {
      await axios.post<void>("api/register", data);
      await router.push("/");

      toast.success("User created successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    registerUser,
  };
};

export const RegisterForm = () => {
  const { registerUser } = useRegister();
  const { handleSubmit, register, formState } = useForm<TypeUserRegister>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(registerSchema),
  });

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
            color={formState.errors.username ? "failure" : ""}
            helperText={formState.errors.username?.message}
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
