import { useState } from "react";

import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {type Coin} from "~/domain/Coin";
import {updateCoinRepository} from "~/repository/coin/updateCoin";

const useUpdateCoin = () => {
  const router = useRouter();
  const { id } = router.query;

  const updateCoin = async (data: Partial<Coin>): Promise<void> => {
    await updateCoinRepository(data, id)
  };

  return {
    updateCoin,
  };
};

export const UpdateCoinOrganism = () => {
  const { updateCoin } = useUpdateCoin();
  const { handleSubmit, register } = useForm({
    defaultValues: {
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
      <Button type="submit">Update coin</Button>
    </form>
  );
};
