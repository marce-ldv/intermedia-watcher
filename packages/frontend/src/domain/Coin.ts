export interface Coin {
  id: string;
  name: string;
  logo: string;
  price: string;
  marketCap: string;
  priceChange24hAgo: string;
  symbol: string;
  canFavorite: boolean;
  isFavorite?: boolean;
}
