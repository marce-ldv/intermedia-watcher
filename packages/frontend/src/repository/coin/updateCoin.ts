import axios from "axios";

import {type Coin} from "~/domain/Coin";

export const updateCoinRepository = async (data: Partial<Coin>, id: string): Promise<void> => {
  try {
    await axios.post("/api/update_coin", {
      id,
      ...data
    })
  } catch (error) {
    console.log(error);
  }
};
