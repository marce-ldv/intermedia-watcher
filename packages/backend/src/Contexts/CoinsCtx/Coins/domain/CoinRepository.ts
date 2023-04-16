import type { Coin } from './Coin';
import { CoinUpdateDTO } from '../application/dto/CoinUpdateDTO';

export interface CoinRepository {
  save(coin: Coin): Promise<void>;

  getAll(): Promise<Coin[]>;

  getTrending(): Promise<Coin[]>;

  update(coin: CoinUpdateDTO): Promise<void>;

  remove(id: string): Promise<void>;

  getCoinById(id: string): Promise<Coin>;
}
