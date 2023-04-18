import axios, { AxiosInstance } from 'axios';
import { CoinGeckoService } from '../application/CoinGeckoService';
import { CoinGeckoDTO } from '../application/dto/CoinGeckoDTO';
import { CoinMarketGeckoDTO } from '../application/dto/CoinMarketGeckoDTO';

export class AxiosCoinGeckoService implements CoinGeckoService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.coingecko.com/api/v3'
    });
  }

  async getList(): Promise<CoinGeckoDTO[]> {
    const { data } = await this.axiosInstance.get('/coins/list');
    return data;
  }

  async getTrending(): Promise<CoinGeckoDTO> {
    const trendingGecko = await this.axiosInstance.get<CoinGeckoDTO>('/search/trending');
    return trendingGecko.data;
  }

  async getMarketInfo(id: string[]): Promise<CoinMarketGeckoDTO[]> {
    const marketCoins = await this.axiosInstance.get<CoinMarketGeckoDTO[]>(`/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: id.join(','),
        order: 'market_cap_desc',
        sparkline: false,
        locale: 'en'
      }
    });

    return marketCoins.data;
  }
}
