import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import { CoinsGetAll } from '../../../../Contexts/CoinsCtx/Coins/application/CoinsGetAll';

export class CoinGetAllController implements Controller {
  private readonly useCase: CoinsGetAll;

  constructor(useCase: CoinsGetAll) {
    this.useCase = useCase;
  }

  async run(req: Request, res: Response): Promise<void> {
    const response = await this.useCase.run();
    res.status(httpStatus.OK).send(response);
  }
}
