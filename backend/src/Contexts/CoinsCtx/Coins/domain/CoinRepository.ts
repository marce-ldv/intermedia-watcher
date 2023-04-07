import type { Coin } from './Coin';

export interface CoinRepository {
	save(course: Coin): Promise<void>;
	getAll(course: Coin): Promise<Coin[]>;
	getTrending(course: Coin): Promise<Coin[]>;
}
