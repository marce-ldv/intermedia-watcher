import { CoinGeckoDTO } from './dto/CoinGeckoDTO';
import {CoinMarketGeckoDTO} from "./dto/CoinMarketGeckoDTO";

export interface CoinGeckoService {
  getList(): Promise<CoinGeckoDTO[]>;
  getTrending(): Promise<CoinGeckoDTO>;
  getMarketInfo(id: string[]): Promise<CoinMarketGeckoDTO[]>;
}
