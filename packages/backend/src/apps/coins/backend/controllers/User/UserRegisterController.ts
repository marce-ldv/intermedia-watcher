import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { UserRegister } from '../../../../../Contexts/CoinsCtx/User/application/UserRegister';
import { TypeUser } from '../../../../../Contexts/CoinsCtx/User/domain/User';
import jwt from "jsonwebtoken";

export class UserRegisterController implements Controller {
  private readonly useCase: UserRegister;

  constructor(useCase: UserRegister) {
    this.useCase = useCase;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<void> {
    const token = req.headers.token as string;

    if (!token) {
      res.status(httpStatus.FORBIDDEN).send({
        message: 'Forbidden, you need to be logged in to register a new user'
      });
    }

    const decoded = jwt.decode(token)

    // @ts-ignore
    if (decoded.payload.role !== 'admin') {
      res.status(httpStatus.UNAUTHORIZED).send({
        message: 'Unauthorized, you need to be an admin to register a new user'
      });
    } else {
      const response = await this.useCase.run(req.body);
      res.status(httpStatus.OK).send(response);
    }
  }
}
