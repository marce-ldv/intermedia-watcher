import { Request, Response, Router } from 'express';

import { CoinPutController } from '../controllers/CoinPutController';
import container from '../dependency-injection';
import {CoinGetAllController} from "../controllers/CoinGetAllController";
import {CoinGetTrendingController} from "../controllers/CoinGetTrendingController";

export const register = (router: Router): void => {
	const coinPutController = container.get<CoinPutController>(
		'Apps.coins.controllers.CoinPutController'
	);
  const coinGetAllController = container.get<CoinGetAllController>(
    'Apps.coins.controllers.CoinGetAllController'
  );
  const coinGetTrendingController = container.get<CoinGetTrendingController>(
    'Apps.coins.controllers.CoinGetTrendingController'
  );

	router.put('/coins/:id', (req: Request, res: Response) => coinPutController.run(req, res));
	router.get('/coins/all', (req: Request, res: Response) => coinGetAllController.run(req, res));
	router.get('/coins/trending', (req: Request, res: Response) => coinGetTrendingController.run(req, res));
};
