import { columns } from "~/components/organisms/Table/columns";
import { useEffect, useState } from "react";
import { getTrendingCoins } from "~/repository/getTrendingCoins";
import type { Coin } from "~/domain/Coin";
import Image from "next/image";
import { Checkbox, Table } from "flowbite-react";

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);

  useEffect(() => {
    const handleData = async (): Promise<void> => {
      const data = await getTrendingCoins();
      setData(data);
    };

    void handleData();
  }, []);

  return {
    columns,
    data,
  };
};

export const CustomTable = () => {
  const { columns, data } = useTable();

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
        {data.map((row) => (
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
              <Checkbox id="remember" checked={row.canFavorite} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};