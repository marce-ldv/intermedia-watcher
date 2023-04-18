import axios from "~/config/instance";

export const removeCoinRepository = async (id: string): Promise<void> => {
  try {
    await axios.post("api/remove_coin", {
      id,
    });
  } catch (error) {
    console.log(error);
  }
};
