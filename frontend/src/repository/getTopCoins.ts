import axios from "~/config/instance";

export const getTopCoins = async () => {
  const { data } = await axios.get("search/trending");
  return data;
}
