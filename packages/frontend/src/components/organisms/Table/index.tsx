import { columns } from "~/components/organisms/Table/columns";
import { useEffect, useState } from "react";
import type { Coin } from "~/domain/Coin";
import Image from "next/image";
import { Table, Rating, Dropdown, Spinner } from "flowbite-react";
import { getTrendingCoins } from "~/repository/coin/getTrendingCoins";
import { getAllFavoritesUser } from "~/repository/user/getAllFavorites";
import { toggleFavoritesUser } from "~/repository/user/toggleFavorites";
import { useGetUser } from "~/hooks/useGetUser";
import Link from "next/link";
import { PopUpModal } from "~/components/organisms/PopUpModal";

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  const fetchTrendingCoins = async () => {
    const trendingData = await getTrendingCoins();
    const newData = trendingData.map((item) => {
      return {
        ...item,
        isFavorite: favorites.includes(item.id),
      };
    });

    setData(newData);
  };

  useEffect(() => {
    if (isLoggedIn) {
      void handleData();
    } else {
      void fetchTrendingCoins();
    }
  }, [isLoggedIn]);

  const handleClickFavorite = async (favoriteId: string) => {
    await toggleFavoritesUser({ favoriteId });
    void handleData();
  };

  const handleClickRemove = (id: string) => {
    setIsOpenDelete(true);
    console.log("id", id);
    // await removeFavoritesUser({ favoriteId: id, email: user.email });
    // await handleData();

    // setIsOpenDelete(false);
  };

  const handleClickConfirm = () => {
    alert("favoriteId");
    // await removeFavoritesUser({ favoriteId, email: user.email });
    setIsOpenDelete(false);
  };

  return {
    columns,
    data,
    handleClickFavorite,
    handleClickRemove,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user,
    isLoggedIn,
    isOpenDelete,
    setIsOpenDelete,
    handleClickConfirm,
  };
};

export const CustomTable = () => {
  const tableProps = useTable();

  return (
    <>
      {!tableProps.data.length ? (
        <div className="flex h-screen items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            maxWidth: "95vw",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Table hoverable={true}>
            <Table.Head>
              {columns.map((column) => (
                <Table.HeadCell className="!p-4" key={column.accessor}>
                  {column.Header}
                </Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {tableProps.data.map((row: Coin) => (
                <Table.Row
                  key={row.name}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {tableProps.isLoggedIn ? (
                    <Table.Cell className="!p-4">
                      <Rating>
                        <Rating.Star
                          onClick={() => {
                            void tableProps.handleClickFavorite(row.id);
                          }}
                          filled={row.isFavorite}
                        />
                      </Rating>
                    </Table.Cell>
                  ) : (
                    <Table.Cell className="!p-4">
                      <div>-</div>
                    </Table.Cell>
                  )}
                  <Table.Cell className="!p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-8 w-8">
                        <Image
                          src={row.logo}
                          alt={row.name}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{row.name}</span>
                        <span className="text-xs text-gray-500">
                          {row.symbol}
                        </span>
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

                  {/* action button to edit remove a coin */}
                  <Table.Cell className="!p-4">
                    <Dropdown label="⚒️" size="xs" color="light">
                      <Dropdown.Item>
                        <Link href={`/coin/${row.id}`}> View </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href={`/coin/${row.id}/edit`}> Edit </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => tableProps.handleClickRemove(row.id)}>
                        Remove
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <PopUpModal
            onClickConfirm={tableProps.handleClickConfirm}
            onClickCancel={() => tableProps.setIsOpenDelete(false)}
            onClose={() => tableProps.setIsOpenDelete(false)}
            show={tableProps.isOpenDelete}
          />
        </div>
      )}
    </>
  );
};
