import { CoinRepository } from '../domain/CoinRepository';
import { Coin } from '../domain/Coin';
import axios from 'axios';

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;

export class SanityCoinsRepository implements CoinRepository {
  async getAll(coin: Coin): Promise<Coin[]> {
    const response = await axios.get(`https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/user`, {
      params: {
        query: `*[_type == "coin"]`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SANITY_TOKEN}`
      }
    });

    return response.data;
  }

  async getTrending(coin: Coin): Promise<Coin[]> {
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

  async update(coin: Coin): Promise<void> {
    const response = await axios.post(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/user`,
      {
        mutations: [
          {
            patch: {
              id: coin.id,
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
}