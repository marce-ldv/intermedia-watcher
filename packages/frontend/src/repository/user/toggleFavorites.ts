import axios from "axios";

interface ToggleFavoritesUser {
  favoriteId: string;
  email: string;
}

export const toggleFavoritesUser = async ({
  favoriteId,
  email,
}: ToggleFavoritesUser): Promise<string[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await axios.post("api/toggle_favorite", {
    email,
    favoriteId,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};
