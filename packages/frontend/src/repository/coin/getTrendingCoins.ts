import axios from "axios";

import type { Coin } from "~/domain/Coin";

export const getTrendingCoins = async (): Promise<Coin[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get("api/trending");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};
