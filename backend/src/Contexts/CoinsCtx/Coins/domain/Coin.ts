type TypeCoin = {
  id: string;
  name: string;
  logo: string;
  price: string;
  market_cap_rank: number;
  price_24h_ago: string;
  symbol: string;
  canFavorite: boolean
};

export class Coin {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  readonly price: string;
  readonly market_cap_rank: number;
  readonly price_24h_ago: string;
  readonly symbol: string;
  readonly canFavorite: boolean;

  constructor({id, name, logo, price, market_cap_rank, price_24h_ago, symbol, canFavorite }: TypeCoin) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.price = price;
    this.market_cap_rank = market_cap_rank;
    this.price_24h_ago = price_24h_ago;
    this.symbol = symbol;
    this.canFavorite = canFavorite;
  }
}
