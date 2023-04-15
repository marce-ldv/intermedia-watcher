import { CoinRepository } from '../domain/CoinRepository';

export class CoinsRemoveCoinService {
  private readonly useCase: CoinRepository;

  constructor(useCase: CoinRepository) {
    this.useCase = useCase;
  }

  async run(id: string): Promise<void> {
    return this.useCase.remove(id);
  }
}
