import { CoinGeckoService } from "./CoinGeckoService";
import {Coin} from "../domain/Coin";

export class CoinsGetTrending {
	private readonly service: CoinGeckoService;

	constructor(coinGeckoService: CoinGeckoService) {
		this.service = coinGeckoService;
	}

	async run(): Promise<Coin[]> {
		const response = await this.service.getTrending();

    const coins = response.coins.map(({ item }) => {
      return new Coin({
        id: item.id,
        name: item.name,
        logo: item.small,
        price: String(item.price_btc),
        market_cap_rank: item.market_cap_rank,
        price_24h_ago: String(item.price_btc),
        symbol: item.symbol,
        canFavorite: false
      })
    })

    return coins
	}
}
