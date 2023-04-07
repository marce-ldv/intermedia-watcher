import axios, {AxiosInstance} from "axios";
import { CoinGeckoService } from "../application/CoinGeckoService";
import {CoinElement, CoinGeckoDTO} from "../application/dto/CoinGeckoDTO";
import {CoinMarketGeckoDTO} from "../application/dto/CoinMarketGeckoDTO";
import {CoinTrendingCombinedGeckoDTO} from "../application/dto/CoinTrendingCombinedGeckoDTO";

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

  async getTrending(): Promise<CoinTrendingCombinedGeckoDTO[]> {
    const {data} = await this.axiosInstance.get<CoinGeckoDTO>("/search/trending");
    const trendingGecko = data.coins;

    const ids = trendingGecko.map(({ item }) => {
      return item.id
    }).join(',')

    const coinsMarkets = await this.axiosInstance.get<CoinMarketGeckoDTO>(`/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
      }
    })

    const coinsMarketsData = coinsMarkets?.data
    return this.combineCoinsAndTrending(trendingGecko, coinsMarketsData)
  }

  combineCoinsAndTrending(coins: CoinElement[], market: any): CoinTrendingCombinedGeckoDTO[]{
    return coins.map((coin) => {
      const marketCoin = market.find((marketCoin: CoinMarketGeckoDTO) => marketCoin.id === coin.item.id)
      return {
        ...coin.item,
        price_change_24h: marketCoin.price_change_24h,
        coin_id: marketCoin.coin_id,
        market_cap: marketCoin.market_cap,
      }
    })
  }
}
