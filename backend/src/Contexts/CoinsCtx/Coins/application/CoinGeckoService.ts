import {CoinGeckoDTO} from "./dto/CoinGeckoDTO";
import {CoinTrendingCombinedGeckoDTO} from "./dto/CoinTrendingCombinedGeckoDTO";

export interface CoinGeckoService {
  getList(): Promise<CoinGeckoDTO[]>;
  getTrending(): Promise<CoinTrendingCombinedGeckoDTO[]>;
}
