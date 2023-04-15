import { CoinGeckoService } from './CoinGeckoService';
import { Coin } from '../domain/Coin';
import { CoinRepository } from '../domain/CoinRepository';

export class CoinsGetTrending {
  private readonly coinGeckoService: CoinGeckoService;
  private readonly coinRepository: CoinRepository;

  constructor(coinGeckoService: CoinGeckoService, coinRepository: CoinRepository) {
    this.coinGeckoService = coinGeckoService;
    this.coinRepository = coinRepository;
  }

  async run(): Promise<Coin[]> {
    const coinsTrendingDTO = await this.coinGeckoService.getTrending();
    const coinsTrending = coinsTrendingDTO.coins?.map(({ item }) => item);
    const coinsSanity = await this.coinRepository.getAll();

    const allCoins = [...coinsTrending, ...coinsSanity];

    // get ids from trending coins from gecko and sanity
    const allCoinsIds = allCoins.map(item => item.id);

    const marketInfo = await this.coinGeckoService.getMarketInfo(allCoinsIds);

    const intersectionMktSanityCoin = marketInfo.map(coin => {
      const sanityCoin = coinsSanity.find(sanityCoin => sanityCoin.id === coin.id);

      return {
        ...coin,
        canFavorite: sanityCoin?.canFavorite ?? true,
        name: sanityCoin?.name ?? coin.name,
        symbol: sanityCoin?.symbol ?? coin.symbol,
        logo: sanityCoin?.logo ?? coin.image
      };
    });

    const coins = intersectionMktSanityCoin.map(coin => {
      return new Coin({
        id: coin.id,
        name: coin.name,
        logo: coin.logo,
        price: String(coin.current_price),
        marketCap: String(coin.market_cap),
        priceChange24hAgo: String(coin.price_change_percentage_24h),
        symbol: coin.symbol,
        canFavorite: coin.canFavorite
      });
    });

    return coins;
  }
}
