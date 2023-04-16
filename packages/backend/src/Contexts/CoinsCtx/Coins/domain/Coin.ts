type TypeCoin = {
  id: string;
  name: string;
  logo: string;
  price: string;
  marketCap: string;
  priceChange24hAgo: string;
  symbol: string;
  canFavorite: boolean;
  isSanityCoin?: boolean;
};

export class Coin {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly price: string;
  readonly marketCap: string;
  readonly priceChange24hAgo: string;
  readonly symbol: string;
  readonly canFavorite: boolean;
  readonly isSanityCoin?: boolean;

  constructor({ id, name, logo, price, marketCap, priceChange24hAgo, symbol, canFavorite, isSanityCoin }: TypeCoin) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.price = price;
    this.marketCap = marketCap;
    this.priceChange24hAgo = priceChange24hAgo;
    this.symbol = symbol;
    this.canFavorite = canFavorite;
    this.isSanityCoin = isSanityCoin;
  }
}
