import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import { UserLogin } from '../../../../Contexts/CoinsCtx/Auth/application/UserLogin';
import { TypeUser } from '../../../../Contexts/CoinsCtx/Auth/domain/User';

export class UserLoginController implements Controller {
  private readonly useCase: UserLogin;

  constructor(useCase: UserLogin) {
    this.useCase = useCase;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<void> {
    const response = await this.useCase.run(req.body);
    res.status(httpStatus.OK).send(response);
  }
}
