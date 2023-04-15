import type { Coin } from './Coin';

export interface CoinRepository {
  save(coin: Coin): Promise<void>;
  getAll(): Promise<Coin[]>;
  getTrending(): Promise<Coin[]>;
  update(coin: Coin): Promise<void>;
}
