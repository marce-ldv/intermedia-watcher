import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import { UserLogin } from '../../../../Contexts/CoinsCtx/Auth/application/UserLogin';
import { TypeUser } from '../../../../Contexts/CoinsCtx/Auth/domain/User';
import { ValidateUserService } from '../../../../Contexts/CoinsCtx/Auth/application/ValidateUserService';

export class UserLoginController implements Controller {
  private readonly useCaseGetUser: UserLogin;
  private readonly useCaseValidateUser: ValidateUserService;

  constructor(useCaseGetUser: UserLogin, useCaseValidateUser: ValidateUserService) {
    this.useCaseGetUser = useCaseGetUser;
    this.useCaseValidateUser = useCaseValidateUser;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<void> {
    const user = await this.useCaseGetUser.run(req.body);

    if(user.username === '' && user.email === '' && user.password === '') {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }

    const isValidPassword = this.useCaseValidateUser.validateUserPassword(user, req.body.password);

    if (!isValidPassword) {
      res.status(httpStatus.UNAUTHORIZED).send();
      return;
    }

    res.status(httpStatus.OK).send(user);
  }
}
