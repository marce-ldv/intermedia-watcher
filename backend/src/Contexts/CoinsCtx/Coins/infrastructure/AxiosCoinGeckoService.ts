import axios, {AxiosInstance} from "axios";
import { CoinGeckoService } from "../application/CoinGeckoService";
import {CoinGeckoDTO} from "../application/dto/CoinGeckoDTO";
import {CoinMarketGeckoDTO} from "../application/dto/CoinMarketGeckoDTO";

export class AxiosCoinGeckoService implements CoinGeckoService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.coingecko.com/api/v3",
    });
  }

  async getList(): Promise<CoinGeckoDTO[]> {
    const {data} = await this.axiosInstance.get('/coins/list');
    return data;
  }

  async getTrending(): Promise<any> {
    const {data} = await this.axiosInstance.get<CoinGeckoDTO>("/search/trending");

    const ids = data.coins.map(({ item }) => {
      return item.id
    }).join(',')

    const coins = await this.axiosInstance.get<CoinMarketGeckoDTO>(`/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
      }
    })

    // const d = this.combineCoinsAndTrending(data.coins, coins.data)
    // console.log('data combined', d)

    return coins.data;
  }

  // combineCoinsAndTrending(coins: CoinGeckoDTO[], trending: CoinMarketGeckoDTO[]) {
  //   return coins.map((coin) => {
  //     const trendingCoin = trending.find((trendingCoin) => trendingCoin.id === coin.item.id)
  //     return {
  //       ...coin,
  //       item: {
  //         ...coin.item,
  //         price_btc: trendingCoin?.current_price,
  //         market_cap_rank: trendingCoin?.market_cap_rank,
  //       }
  //     }
  //   })
  // }
}
