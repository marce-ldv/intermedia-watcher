import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { CoinGetAllController } from '../controllers/Coins/CoinGetAllController';
import { CoinGetTrendingController } from '../controllers/Coins/CoinGetTrendingController';
import { CoinAddCoinController } from '../controllers/Coins/CoinAddCoinController';
import {CoinRemoveCoinController} from "../controllers/Coins/CoinRemoveCoinController";

export const register = (router: Router): void => {
  const coinGetAllController = container.get<CoinGetAllController>('Apps.coins.controllers.CoinGetAllController');
  const coinGetTrendingController = container.get<CoinGetTrendingController>(
    'Apps.coins.controllers.CoinGetTrendingController'
  );
  const coinAddCoinController = container.get<CoinAddCoinController>('Apps.coins.controllers.CoinAddCoinController');
  const coinRemoveCoinController = container.get<CoinRemoveCoinController>('Apps.coins.controllers.CoinRemoveCoinController');

  router.get('/coins/all', (req: Request, res: Response) => coinGetAllController.run(req, res));
  router.get('/coins/trending', (req: Request, res: Response) => coinGetTrendingController.run(req, res));
  router.post('/coins/add', (req: Request, res: Response) => coinAddCoinController.run(req, res));
  router.delete('/coins/remove', (req: Request, res: Response) => coinRemoveCoinController.run(req, res));
};
