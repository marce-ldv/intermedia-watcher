import axios from 'axios';

export const coingecko_api = 'https://api.coingecko.com/api/v3/';

const instance = axios.create({
  baseURL: coingecko_api,
});

export default instance;
