import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { UserLogin } from '../../../../../Contexts/CoinsCtx/User/application/UserLogin';
import { TypeUser } from '../../../../../Contexts/CoinsCtx/User/domain/User';
import { ValidateUserService } from '../../../../../Contexts/CoinsCtx/User/application/ValidateUserService';
import { LoginResponseDTO } from '../../../../../Contexts/CoinsCtx/User/application/dto/LoginResponseDTO';
import { JWTService } from '../../../../../Contexts/CoinsCtx/User/application/JWTService';

export class UserLoginController implements Controller {
  private readonly useCaseGetUser: UserLogin;
  private readonly useCaseValidateUser: ValidateUserService;
  private readonly useCaseJWT: JWTService;

  constructor(useCaseGetUser: UserLogin, useCaseValidateUser: ValidateUserService, useCaseJWT: JWTService) {
    this.useCaseGetUser = useCaseGetUser;
    this.useCaseValidateUser = useCaseValidateUser;
    this.useCaseJWT = useCaseJWT;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<LoginResponseDTO | any> {
    const user = await this.useCaseGetUser.run(req.body);

    if (user.username === '' && user.email === '' && user.password === '') {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }

    const isValidPassword = this.useCaseValidateUser.validateUserPassword(user, req.body.password);

    if (!isValidPassword) {
      res.status(httpStatus.UNAUTHORIZED).send();
      return;
    }

    const token = this.useCaseJWT.generateToken({
      payload: {
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

    const response: LoginResponseDTO = {
      token,
      user: {
        username: user.username,
        email: user.email,
        favorites: user.favorites,
        role: user.role
      }
    };

    res.status(httpStatus.OK).send(response);
  }
}
