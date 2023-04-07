import type { Coin } from './Coin';

export interface CoinRepository {
	save(coin: Coin): Promise<void>;
	getAll(coin: Coin): Promise<Coin[]>;
	getTrending(coin: Coin): Promise<Coin[]>;
}
