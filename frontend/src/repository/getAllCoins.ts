import axios from "~/config/instance";

export const getAllCoins = async () => {
  const { data } = await axios.get("coins/list");
  return data;
}
