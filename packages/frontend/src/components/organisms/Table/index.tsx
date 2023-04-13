import { columns } from "~/components/organisms/Table/columns";
import { useEffect, useState } from "react";
import type { Coin } from "~/domain/Coin";
import Image from "next/image";
import { Checkbox, Table } from "flowbite-react";
import { getTrendingCoins } from "~/repository/coin/getTrendingCoins";
import { getAllFavoritesUser } from "~/repository/user/getAllFavorites";
import { toggleFavoritesUser } from "~/repository/user/toggleFavorites";
import { useGetUser } from "~/hooks/useGetUser";

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user, isLoggedIn } = useGetUser();

  const handleData = async (): Promise<void> => {
    const [trendingData, favoritesData] = await Promise.all([
      getTrendingCoins(),
      getAllFavoritesUser(),
    ]);

    const newData = trendingData.map((item) => {
      return {
        ...item,
        isFavorite: favoritesData.includes(item.id),
      };
    });

    setFavorites(favoritesData);
    setData(newData);
  };

  useEffect(() => {
    void handleData();
  }, []);

  const handleClickFavorite = async (favoriteId: string) => {
    await toggleFavoritesUser({ favoriteId, email: user.email });

    await handleData();
  };

  const handleDisabled = (canFavorite: boolean): boolean => {
    console.log('canFavorite', canFavorite)
    if (isLoggedIn || canFavorite) {
      return false;
    }

    return true;
  };

  return {
    columns,
    data,
    handleClickFavorite,
    handleDisabled,
    user,
    isLoggedIn,
  };
};

export const CustomTable = () => {
  const { columns, data, isLoggedIn, handleClickFavorite, handleDisabled } =
    useTable();

  return (
    <Table hoverable={true}>
      <Table.Head>
        {columns.map((column) => (
          <Table.HeadCell className="!p-4" key={column.accessor}>
            {column.Header}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((row: Coin) => (
          <Table.Row
            key={row.name}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="!p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-8 w-8">
                  <Image src={row.logo} alt={row.name} width={32} height={32} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{row.name}</span>
                  <span className="text-xs text-gray-500">{row.symbol}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="!p-4">
              <span className="text-sm font-medium">{row.price}</span>
            </Table.Cell>
            <Table.Cell className="!p-4">
              <span className="text-sm font-medium">{row.marketCap}</span>
            </Table.Cell>
            <Table.Cell className="!p-4">
              <span className="text-sm font-medium">
                {row.priceChange24hAgo}
              </span>
            </Table.Cell>
            {isLoggedIn ? (
              <Table.Cell className="!p-4">
                <Checkbox
                  id="remember"
                  disabled={handleDisabled(row.canFavorite)}
                  onClick={() => {
                    void handleClickFavorite(row.id);
                  }}
                  checked={row.isFavorite}
                />
              </Table.Cell>
            ) : (
              <Table.Cell className="!p-4">
                <div></div>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
