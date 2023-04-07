import {columns} from "~/components/organisms/Table/columns";
import {useEffect, useState} from "react";
import {getTrendingCoins} from "~/repository/getTrendingCoins";
import type {Coin} from "~/domain/Coin";
import Image from "next/image";

const useTable = () => {
  const [data, setData] = useState<Coin[]>([]);

  useEffect(() => {
    const handleData = async (): Promise<void> => {
      const data = await getTrendingCoins()
      setData(data)
    }

    void handleData()
  }, []);

  return {
    columns,
    data,
  }
}

export const Table = () => {
  const { columns, data } = useTable()

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        {
          columns.map((column) => (
            <th
              key={column.accessor}
              scope="col"
              className="px-6 py-3"
            >
              {column.Header}
            </th>
          ))
        }
        </thead>
        <tbody>
        {
          data.map((row) => (
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800" key={row.name}>
              <td className="px-6 py-4">
                <Image src={row.logo} alt={row.name} width={20} height={20} />
              </td>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {row.name}
              </th>
              <td className="px-6 py-4">{row.symbol}</td>
              <td className="px-6 py-4">{row.price}</td>
              <td className="px-6 py-4">{row.priceChange24hAgo}</td>
              <td className="px-6 py-4">{row.marketCap}</td>
              <td className="px-6 py-4">
                {/*  checkbox */}
                {row.canFavorite}
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}
