import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { CoinsAddCoinService } from '../../../../../Contexts/CoinsCtx/Coins/application/CoinsAddCoinService';

export class CoinAddCoinController implements Controller {
  private readonly useCase: CoinsAddCoinService;

  constructor(useCase: CoinsAddCoinService) {
    this.useCase = useCase;
  }

  async run(req: Request, res: Response): Promise<void> {
    const response = await this.useCase.run(req.body);
    res.status(httpStatus.OK).send(response);
  }
}
