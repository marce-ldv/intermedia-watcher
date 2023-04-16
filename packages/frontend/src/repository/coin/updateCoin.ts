import axios from "axios";

export const updateCoinRepository = async (data, id): Promise<void> => {
  try {
    await axios.post("/api/update_coin", {
      id,
      ...data
    })
  } catch (error) {
    console.log(error);
  }
};
