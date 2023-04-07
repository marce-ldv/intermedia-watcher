import { CoinGeckoService } from "./CoinGeckoService";
import {CoinGecko} from "../domain/CoinGecko";

export class CoinsGetTrending {
	private readonly service: CoinGeckoService;

	constructor(coinGeckoService: CoinGeckoService) {
		this.service = coinGeckoService;
	}

	async run(): Promise<CoinGecko[]> {
		return this.service.getTrending();
	}
}
