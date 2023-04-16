import { CoinRepository } from '../domain/CoinRepository';
import { Coin } from '../domain/Coin';

export class CoinsGetCoinService {
  private readonly repository: CoinRepository;

  constructor(coinGeckoService: CoinRepository) {
    this.repository = coinGeckoService;
  }

  async run(id: string): Promise<Coin> {
    return this.repository.getCoinById(id);
  }
}
