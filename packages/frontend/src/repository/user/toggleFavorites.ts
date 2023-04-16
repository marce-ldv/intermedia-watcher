import axios from "~/config/instance";

interface ToggleFavoritesUser {
  favoriteId: string;
}

export const toggleFavoritesUser = async ({
  favoriteId,
}: ToggleFavoritesUser): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  await axios.post("api/toggle_favorite", {
    favoriteId,
  });
};
