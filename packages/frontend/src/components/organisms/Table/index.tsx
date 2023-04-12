import { columns } from "~/components/organisms/Table/columns";
import { useEffect, useState } from "react";
import type { Coin } from "~/domain/Coin";
import Image from "next/image";
import { Checkbox, Table } from "flowbite-react";
import axios from "axios";
import { getTrendingCoins } from "~/repository/coin/getTrendingCoins";
import { getAllFavoritesUser } from "~/repository/user/getAllFavorites";

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const handleData = async (): Promise<void> => {
      const [trendingData, favoritesData] = await Promise.all([
        getTrendingCoins(),
        getAllFavoritesUser(),
      ]);
      setData(trendingData);
      setFavorites(favoritesData);
    };

    void handleData();
  }, []);

  const handleClickFavorite = async (id: string) => {
    await axios.post("api/add_favorite", {
      favorites: id,
      email: "marce3@test.com",
    });
  };

  const newData = data.map((item) => {
    if (favorites.includes(item.id)) {
      return {
        ...item,
        isFavorite: true,
      };
    }
    return item;
  });

  return {
    columns,
    data: newData,
    handleClickFavorite,
  };
};

export const CustomTable = () => {
  const { columns, data, handleClickFavorite } = useTable();

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
            <Table.Cell className="!p-4">
              <Checkbox
                id="remember"
                onClick={() => {
                  void handleClickFavorite(row.id);
                }}
                checked={row.isFavorite}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
