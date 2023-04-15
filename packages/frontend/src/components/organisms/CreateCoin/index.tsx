import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";

const useCreateCoin = () => {
  const router = useRouter();

  const createCoinRepository = async (data): Promise<void> => {
    const response = await axios.post("/api/create_coin", data);

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
  const { handleSubmit, register } = useForm({
    defaultValues: {
      id: "",
      name: "",
      symbol: "",
      logo: "",
      canFavorite: false,
    }
  });
  const [isCanFavorite, setIsCanFavorite] = useState(false);

  const handleCanFavorite = () => {
    setIsCanFavorite(!isCanFavorite);
  };

  const onSubmit = async (data) => {
    try {
      await createCoinRepository({
        ...data,
        canFavorite: isCanFavorite,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
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
