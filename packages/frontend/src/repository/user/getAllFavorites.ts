import axios from "axios";

export const getAllFavoritesUser = async ({
  email,
}: {
  email: string;
}): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.get("api/get_all_favorites", {
    headers: {
      email,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};
