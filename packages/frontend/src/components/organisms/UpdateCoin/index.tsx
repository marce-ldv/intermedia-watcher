import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { updateCoinSchema } from "~/components/organisms/UpdateCoin/validations";
import { type Coin } from "~/domain/Coin";
import { updateCoinRepository } from "~/repository/coin/updateCoin";

const useUpdateCoin = () => {
  const router = useRouter();
  const { id } = router.query;

  const updateCoin = async (data: Partial<Coin>): Promise<void> => {
    try {
      await updateCoinRepository(data, id as string);

      toast.success("Coin updated successfully");
      await router.push("/");
    } catch (error) {
      toast.error("Failed to update coin");
    }
  };

  return {
    updateCoin,
  };
};

export const UpdateCoinOrganism = () => {
  const { updateCoin } = useUpdateCoin();
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: "",
      symbol: "",
      logo: "",
      canFavorite: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    resolver: zodResolver(updateCoinSchema),
  });
  const [isCanFavorite, setIsCanFavorite] = useState(false);

  const handleCanFavorite = () => {
    setIsCanFavorite(!isCanFavorite);
  };

  const onSubmit = async (data: Partial<Coin>) => {
    try {
      await updateCoin({
        ...data,
        canFavorite: isCanFavorite,
      });
    } catch (error) {
      console.log(error);
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
      <Button type="submit">Update coin</Button>
    </form>
  );
};
