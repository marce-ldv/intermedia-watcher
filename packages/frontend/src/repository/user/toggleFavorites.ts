import axios from "axios";

interface ToggleFavoritesUser {
  favoriteId: string;
  email: string;
}

export const toggleFavoritesUser = async ({
  favoriteId,
  email,
}: ToggleFavoritesUser): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  await axios.post("api/toggle_favorite", {
    email,
    favoriteId,
  });
};
