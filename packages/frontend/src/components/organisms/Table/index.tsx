import { columns } from "~/components/organisms/Table/columns";
import { useEffect, useState } from "react";
import type { Coin } from "~/domain/Coin";
import Image from "next/image";
import { Table, Rating, Dropdown } from "flowbite-react";
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
  const { user, isLoggedIn } = useGetUser();

  const handleData = async (): Promise<void> => {
    const [trendingData, favoritesData] = await Promise.all([
      getTrendingCoins(),
      getAllFavoritesUser({
        email: user.email,
      }),
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
    console.log("canFavorite", canFavorite);
    if (isLoggedIn || canFavorite) {
      return false;
    }

    return true;
  };

  const handleClickRemove = (id: string) => {
    setIsOpenDelete(true);
    console.log('id', id);
    // await removeFavoritesUser({ favoriteId: id, email: user.email });
    // await handleData();

    // setIsOpenDelete(false);
  };

  const handleClickConfirm = () => {
    alert('favoriteId');
    // await removeFavoritesUser({ favoriteId, email: user.email });
    setIsOpenDelete(false);
  }

  return {
    columns,
    data,
    handleClickFavorite,
    handleDisabled,
    handleClickRemove,
    user,
    isLoggedIn,
    isOpenDelete,
    setIsOpenDelete,
    handleClickConfirm,
  };
};

export const CustomTable = () => {
  const {
    columns,
    data,
    isLoggedIn,
    handleClickFavorite,
    handleDisabled,
    handleClickRemove,
    isOpenDelete,
    setIsOpenDelete,
    handleClickConfirm,
  } = useTable();

  return (
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
          {data.map((row: Coin) => (
            <Table.Row
              key={row.name}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {isLoggedIn ? (
                <Table.Cell className="!p-4">
                  <Rating>
                    <Rating.Star
                      onClick={() => {
                        void handleClickFavorite(row.id);
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

              {/* action button to edit remove a coin */}
              <Table.Cell className="!p-4">
                <Dropdown
                  label="⚒️"
                  size="xs"
                  color="light"
                >
                  <Dropdown.Item>
                    <Link href={`/coin/${row.id}`}> View </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href={`/coin/${row.id}/edit`}> Edit </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleClickRemove(row.id)}>
                    Remove
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PopUpModal
        onClickConfirm={handleClickConfirm}
        onClickCancel={() => setIsOpenDelete(false)}
        onClose={() => setIsOpenDelete(false)} show={isOpenDelete}
      />
    </div>
  );
};
