import { useState } from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {createCoinSchema} from "~/components/organisms/CreateCoin/validations";
import axios from "~/config/instance";

type TypeCreateCoin = {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  canFavorite: boolean;
};

const useCreateCoin = () => {
  const router = useRouter();

  const createCoinRepository = async (data: TypeCreateCoin): Promise<void> => {
    const response = await axios.post("api/create_coin", data);

    if (!response) {
      throw new Error("Failed to create coin");
    }

    await router.push("/");
  };

  return {
    createCoinRepository,
  };
};

export const CreateCoinOrganism = () => {
  const { createCoinRepository } = useCreateCoin();
  const { handleSubmit, register, formState } = useForm<TypeCreateCoin>({
    defaultValues: {
      id: "",
      name: "",
      symbol: "",
      logo: "",
      canFavorite: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(createCoinSchema),
  });
  const [isCanFavorite, setIsCanFavorite] = useState(false);

  const handleCanFavorite = () => {
    setIsCanFavorite(!isCanFavorite);
  };

  const onSubmit = async (data: TypeCreateCoin) => {
    try {
      await createCoinRepository({
        ...data,
        canFavorite: isCanFavorite,
      });

      toast.success("Coin created successfully");
    } catch (error) {
      toast.error("Failed to create coin");
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-1/2 flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="id" value="Coin Id" />
        </div>
        <TextInput
          id="id"
          type="id"
          placeholder="nmatic-network"
          required
          {...register("id")}
          color={formState.errors.id ? "failure" : ""}
          helperText={formState.errors.id?.message}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Coin name" />
        </div>
        <TextInput
          id="name"
          type="name"
          placeholder="Ethereum"
          required
          {...register("name")}
          color={formState.errors.name ? "failure" : ""}
          helperText={formState.errors.name?.message}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="symbol" value="Coin symbol" />
        </div>
        <TextInput
          id="symbol"
          type="symbol"
          placeholder="ETH"
          required
          {...register("symbol")}
          color={formState.errors.symbol ? "failure" : ""}
          helperText={formState.errors.symbol?.message}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="logo" value="Coin logo" />
        </div>
        <TextInput
          id="logo"
          type="logo"
          placeholder="https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png"
          required
          {...register("logo")}
          color={formState.errors.logo ? "failure" : ""}
          helperText={formState.errors.logo?.message}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="favorite" value="Can favorite?" />
        </div>
        <ToggleSwitch
          checked={isCanFavorite}
          label="Can favorite?"
          {...register("canFavorite")}
          onChange={handleCanFavorite}
        />
      </div>
      <Button type="submit">Create coin</Button>
    </form>
  );
};
