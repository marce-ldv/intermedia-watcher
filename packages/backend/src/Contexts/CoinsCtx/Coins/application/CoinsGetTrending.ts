import { CoinGeckoService } from './CoinGeckoService';
import { Coin } from '../domain/Coin';

export class CoinsGetTrending {
  private readonly service: CoinGeckoService;

  constructor(coinGeckoService: CoinGeckoService) {
    this.service = coinGeckoService;
  }

  async run(): Promise<Coin[]> {
    const combinedTrending = await this.service.getTrending();

    const coins = combinedTrending?.map(item => {
      return new Coin({
        id: item.id,
        name: item.name,
        logo: item.small,
        price: String(item.price_btc),
        marketCap: String(item.market_cap),
        priceChange24hAgo: String(item.price_change_24h),
        symbol: item.symbol,
        canFavorite: false
      });
    });

    return coins;
  }
}
