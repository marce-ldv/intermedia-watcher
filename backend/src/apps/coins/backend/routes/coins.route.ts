import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import {CoinGetAllController} from "../controllers/CoinGetAllController";
import {CoinGetTrendingController} from "../controllers/CoinGetTrendingController";

export const register = (router: Router): void => {
  const coinGetAllController = container.get<CoinGetAllController>(
    'Apps.coins.controllers.CoinGetAllController'
  );
  const coinGetTrendingController = container.get<CoinGetTrendingController>(
    'Apps.coins.controllers.CoinGetTrendingController'
  );

	router.get('/coins/all', (req: Request, res: Response) => coinGetAllController.run(req, res));
	router.get('/coins/trending', (req: Request, res: Response) => coinGetTrendingController.run(req, res));
};
