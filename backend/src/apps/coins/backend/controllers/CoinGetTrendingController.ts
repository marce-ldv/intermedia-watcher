import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import {CoinsGetTrending} from "../../../../Contexts/CoinsCtx/Coins/application/CoinsGetTrending";

export class CoinGetTrendingController implements Controller {
  private readonly useCase: CoinsGetTrending;

  constructor(useCase: CoinsGetTrending) {
    this.useCase = useCase;
  }

	async run(req: Request, res: Response): Promise<void> {
    const response = await this.useCase.run();
    console.log('CoinGetTrendingController', response)
		res.status(httpStatus.OK).send(response);
	}
}
