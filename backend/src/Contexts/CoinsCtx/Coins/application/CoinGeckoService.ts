import {CoinGeckoDTO} from "./dto/CoinGeckoDTO";

export interface CoinGeckoService {
  getList(): Promise<CoinGeckoDTO[]>;
  getTrending(): Promise<CoinGeckoDTO>;
}
