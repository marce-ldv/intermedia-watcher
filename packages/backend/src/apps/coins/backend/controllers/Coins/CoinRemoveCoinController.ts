import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { CoinsRemoveCoinService } from '../../../../../Contexts/CoinsCtx/Coins/application/CoinsRemoveCoinService';
import jwt from 'jsonwebtoken';

export class CoinRemoveCoinController implements Controller {
  private readonly useCase: CoinsRemoveCoinService;

  constructor(useCase: CoinsRemoveCoinService) {
    this.useCase = useCase;
  }

  async run(req: Request, res: Response): Promise<void> {
    const token = req.headers.token as string;

    if (!token) {
      res.status(httpStatus.FORBIDDEN).send({
        message: 'Forbidden, you need to be logged to remove coins'
      });
    }

    const decoded = jwt.decode(token);

    // @ts-ignore
    if (decoded && decoded.payload.role !== 'admin') {
      res.status(httpStatus.FORBIDDEN).send({
        message: 'Forbidden, you need to be admin to remove coins'
      });
    }

    if (!req.body.id) {
      res.status(httpStatus.BAD_REQUEST).send({ error: 'id is required' });
      return;
    }

    await this.useCase.run(req.body.id);
    res.status(httpStatus.OK).send({
      message: 'Coin removed'
    });
  }
}
