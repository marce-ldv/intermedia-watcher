import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { UserRegister } from '../../../../../Contexts/CoinsCtx/User/application/UserRegister';
import { TypeUser } from '../../../../../Contexts/CoinsCtx/User/domain/User';

export class AddFavoritesController implements Controller {
  private readonly useCase: UserRegister;

  constructor(useCase: UserRegister) {
    this.useCase = useCase;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<void> {
    const response = await this.useCase.run(req.body);
    res.status(httpStatus.OK).send(response);
  }
}