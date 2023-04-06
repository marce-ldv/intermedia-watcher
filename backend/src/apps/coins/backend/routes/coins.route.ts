import { Request, Response, Router } from 'express';

import { CoinPutController } from '../controllers/CoinPutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const coinPutController = container.get<CoinPutController>(
		'Apps.coins.controllers.CoursePutController'
	);
	router.put('/coins/:id', (req: Request, res: Response) => coinPutController.run(req, res));
};
