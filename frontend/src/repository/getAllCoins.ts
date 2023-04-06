import axios from "~/config/instance";
import type {Coin} from "~/domain/Coin";

export const getAllCoins = async (): Promise<Coin[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get("coins/list");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}
