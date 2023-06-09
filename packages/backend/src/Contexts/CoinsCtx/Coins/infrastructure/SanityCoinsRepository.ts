import { CoinRepository } from '../domain/CoinRepository';
import { Coin } from '../domain/Coin';
import axios from 'axios';
import { CoinUpdateDTO } from '../application/dto/CoinUpdateDTO';

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;

export class SanityCoinsRepository implements CoinRepository {
  async getAll(): Promise<Coin[]> {
    const { data } = await axios.get(`https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/user`, {
      params: {
        query: `*[_type == "coin"]`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`
      }
    });

    return data.result;
  }

  async getTrending(): Promise<Coin[]> {
    const response = await axios.get(`https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/user`, {
      params: {
        query: `*[_type == "coin" && trending == true]`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`
      }
    });

    return response.data;
  }

  async save(coin: Coin): Promise<void> {
    const response = await axios.post(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/user`,
      {
        mutations: [
          {
            create: {
              _type: 'coin',
              id: coin.id,
              name: coin.name,
              symbol: coin.symbol,
              logo: coin.logo,
              canFavorite: coin.canFavorite
            }
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SANITY_TOKEN}`
        }
      }
    );

    return response.data;
  }

  async update(coin: CoinUpdateDTO): Promise<void> {
    const response = await axios.post(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/user`,
      {
        mutations: [
          {
            patch: {
              query: `*[_type == "coin" && id == "${coin.id}"]`,
              set: {
                name: coin.name,
                symbol: coin.symbol,
                logo: coin.logo,
                canFavorite: coin.canFavorite
              }
            }
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SANITY_TOKEN}`
        }
      }
    );

    return response.data;
  }

  async remove(id: string): Promise<void> {
    await axios.post(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/user`,
      {
        mutations: [
          {
            delete: {
              query: `*[_type == "coin" && id == "${id}"]`
            }
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SANITY_TOKEN}`
        }
      }
    );
  }

  async getCoinById(id: string): Promise<Coin> {
    const coinResponse = await axios.get(`https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/user`, {
      params: {
        query: `*[_type == "coin" && id == "${id}"]`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`
      }
    });

    if (coinResponse.data.result.length === 0) {
      return new Coin({
        id: '',
        name: '',
        symbol: '',
        logo: '',
        canFavorite: false,
        marketCap: '',
        price: '',
        priceChange24hAgo: '',
        isSanityCoin: false
      });
    }

    return new Coin({ ...coinResponse.data.result[0] });
  }
}
