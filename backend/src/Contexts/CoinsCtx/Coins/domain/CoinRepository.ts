import { Coin } from './Coin';

export interface CoinRepository {
	save(course: Coin): Promise<void>;
}
