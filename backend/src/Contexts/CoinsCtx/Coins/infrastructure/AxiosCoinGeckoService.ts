import axios, {AxiosInstance} from "axios";
import { CoinGeckoService } from "../application/CoinGeckoService";

export class AxiosCoinGeckoService implements CoinGeckoService {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.coingecko.com/api/v3",
    });
  }

  async getList(): Promise<any> {
    const {data} = await this.axiosInstance.get('/coins/list');
    return data;
  }

  async getTrending(): Promise<any> {
    const {data} = await this.axiosInstance.get("/search/trending");
    return data;
  }
}
