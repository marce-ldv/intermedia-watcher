import { useEffect, useState } from "react";

import { Table, Rating, Dropdown, Spinner, ToggleSwitch } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

import { PopUpModal } from "~/components/organisms/PopUpModal";
import { columns } from "~/components/organisms/Table/columns";
import { setModalData } from "~/context/Modals/actions";
import { useModalDispatch, useModalState } from "~/context/Modals/root";
import { useUserState } from "~/context/User/root";
import type { Coin } from "~/domain/Coin";
import { getTrendingCoins } from "~/repository/coin/getTrendingCoins";
import { removeCoinRepository } from "~/repository/coin/removeCoin";
import { getAllFavoritesUser } from "~/repository/user/getAllFavorites";
import { toggleFavoritesUser } from "~/repository/user/toggleFavorites";

const UPDATE_INTERVAL = 60 * 1000;

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<Coin[]>([]);
  const [isShowFavorites, setIsShowFavorites] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const { token } = useUserState();
  const modalDispatch = useModalDispatch();
  const { data: modalData } = useModalState();

  const handleData = async (): Promise<void> => {
    const trendingData = await getTrendingCoins();

    if (!token) {
      setData(trendingData);
      setFavorites([]);
      setIsShowFavorites(false);

      return;
    }

    const favoritesData = await getAllFavoritesUser();

    const newData = trendingData.map((item) => {
      return {
        ...item,
        isFavorite: favoritesData.includes(item.id),
      };
    });

    setData(newData);

    const favorites = newData.filter((item) => item.isFavorite);
    setFavorites(favorites);
  };

  const handleClickFavorite = async (favoriteId: string) => {
    await toggleFavoritesUser({ favoriteId });
    void handleData();
  };

  const handleClickRemove = (id: string) => {
    modalDispatch(setModalData({ id }));
    setIsOpenDelete(true);
  };

  const handleClickConfirm = () => {
    const handleConfirm = async () => {
      await removeCoinRepository(modalData.id as string);
      setIsOpenDelete(false);
    };

    void handleConfirm();
  };

  useEffect(() => {
    void handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // update handleData per minute
  useEffect(() => {
    const interval = setInterval(() => {
      void handleData();
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    columns,
    data,
    isLoggedIn: token !== null,
    favorites,
    isShowFavorites,
    isOpenDelete,
    setIsShowFavorites,
    handleClickFavorite,
    handleClickRemove,
    setIsOpenDelete,
    handleClickConfirm,
  };
};

export const CustomTable = () => {
  const {
    columns,
    data,
    isLoggedIn,
    favorites,
    isShowFavorites,
    isOpenDelete,
    setIsShowFavorites,
    handleClickFavorite,
    handleClickRemove,
    setIsOpenDelete,
    handleClickConfirm,
  } = useTable();

  const renderTableBody = (dataTable: Coin[]) => {
    return (
      <>
        {dataTable.map((row: Coin) => (
          <Table.Row
            key={row.name}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {isLoggedIn && row.canFavorite ? (
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

            {/* action button to edit remove a coin */}
            <Table.Cell className="!p-4">
              <Dropdown
                label="⚒️"
                size="xs"
                color="light"
                disabled={!row?.isSanityCoin}
              >
                <Dropdown.Item>
                  <Link href={`/coin/edit/${row.id}`}>Edit</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleClickRemove(row.id)}>
                  Remove
                </Dropdown.Item>
              </Dropdown>
            </Table.Cell>
          </Table.Row>
        ))}
      </>
    );
  };

  return (
    <>
      {!data.length ? (
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
          <div className="mb-4 flex items-center justify-between">
            {isLoggedIn && (
              <div className="flex justify-start">
                <ToggleSwitch
                  checked={isShowFavorites}
                  label="Show favorites"
                  onChange={setIsShowFavorites}
                />
              </div>
            )}
          </div>
          <Table hoverable={true}>
            <Table.Head>
              {columns.map((column) => (
                <Table.HeadCell className="!p-4" key={column.accessor}>
                  {column.Header}
                </Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="position-absolute">
              {isShowFavorites
                ? renderTableBody(favorites)
                : renderTableBody(data)}
            </Table.Body>
          </Table>

          <PopUpModal
            onClickConfirm={handleClickConfirm}
            onClickCancel={() => setIsOpenDelete(false)}
            onClose={() => setIsOpenDelete(false)}
            show={isOpenDelete}
          />
        </div>
      )}
    </>
  );
};
