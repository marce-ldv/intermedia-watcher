import { CoinRepository } from '../domain/CoinRepository';
import { CoinUpdateDTO } from './dto/CoinUpdateDTO';

export class CoinsUpdateCoinService {
  private readonly useCase: CoinRepository;

  constructor(useCase: CoinRepository) {
    this.useCase = useCase;
  }

  async run(coin: CoinUpdateDTO): Promise<void> {
    return this.useCase.update(coin);
  }
}
