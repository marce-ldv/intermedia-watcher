import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import jwt from 'jsonwebtoken';
import { CoinsUpdateCoinService } from '../../../../../Contexts/CoinsCtx/Coins/application/CoinsUpdateCoinService';
import { CoinsGetCoinService } from '../../../../../Contexts/CoinsCtx/Coins/application/CoinsGetCoinService';

export class CoinUpdateCoinController implements Controller {
  private readonly useCase: CoinsUpdateCoinService;
  private readonly useCaseGetCoin: CoinsGetCoinService;

  constructor(useCase: CoinsUpdateCoinService, useCaseGetCoin: CoinsGetCoinService) {
    this.useCase = useCase;
    this.useCaseGetCoin = useCaseGetCoin;
  }

  async run(req: Request, res: Response): Promise<void> {
    const token = req.headers.token as string;

    if (!token) {
      res.status(httpStatus.FORBIDDEN).send({
        message: 'Forbidden, you need to be logged to update coins'
      });
    }

    const decoded = jwt.decode(token);

    // @ts-ignore
    if (decoded && decoded.payload.role !== 'admin') {
      res.status(httpStatus.FORBIDDEN).send({
        message: 'Forbidden, you need to be admin to update coins'
      });
    }

    if (!req.body.id && !req.body.name && !req.body.symbol && !req.body.logo && !req.body.canFavorite) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({ error: 'Bad request, you need to send all the fields to update a coin' });
      return;
    }

    const coin = await this.useCaseGetCoin.run(req.body.id);

    if (!coin) {
      res.status(httpStatus.NOT_FOUND).send({ error: 'Not found, the coin you want to update does not exist' });
      return;
    }

    const coinUpdated = { ...coin, ...req.body };

    await this.useCase.run(coinUpdated);

    res.status(httpStatus.OK).send({
      message: `Coin ${req.body.name} updated`,
      data: req.body
    });
  }
}
