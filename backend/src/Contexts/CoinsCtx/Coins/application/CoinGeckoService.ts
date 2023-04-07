import {CoinGecko} from "../domain/CoinGecko";

export interface CoinGeckoService {
  getList(): Promise<CoinGecko[]>;
  getTrending(): Promise<CoinGecko[]>;
}
