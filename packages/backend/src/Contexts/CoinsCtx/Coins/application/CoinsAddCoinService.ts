import { CoinRepository } from '../domain/CoinRepository';
import { Coin } from '../domain/Coin';

export class CoinsAddCoinService {
  private readonly useCase: CoinRepository;

  constructor(useCase: CoinRepository) {
    this.useCase = useCase;
  }

  async run(body: any): Promise<void> {
    const coin = new Coin({
      id: body.id,
      name: body.name,
      symbol: body.symbol,
      logo: body.logo,
      price: body.price,
      marketCap: body.marketCap,
      priceChange24hAgo: body.priceChange24hAgo,
      canFavorite: body.canFavorite
    });

    return this.useCase.save(coin);
  }
}
