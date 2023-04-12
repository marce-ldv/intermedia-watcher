import axios from "axios";

export const getAllFavoritesUser = async (): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get("api/get_all_favorites", {
    data: {
      email: "marce3@test.com",
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};
