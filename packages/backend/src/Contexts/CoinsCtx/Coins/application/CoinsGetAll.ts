import { CoinGeckoService } from "./CoinGeckoService";
import {CoinGeckoDTO} from "./dto/CoinGeckoDTO";

export class CoinsGetAll {
	private readonly service: CoinGeckoService;

	constructor(coinGeckoService: CoinGeckoService) {
		this.service = coinGeckoService;
	}

	async run(): Promise<CoinGeckoDTO[]> {
		return this.service.getList();
	}
}
