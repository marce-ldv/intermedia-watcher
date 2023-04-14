import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from '../Controller';
import { UserRegister } from '../../../../../Contexts/CoinsCtx/User/application/UserRegister';
import { TypeUser } from '../../../../../Contexts/CoinsCtx/User/domain/User';
import jwt from "jsonwebtoken";

export class UserGetAllFavoritesController implements Controller {
  private readonly useCase: UserRegister;

  constructor(useCase: UserRegister) {
    this.useCase = useCase;
  }

  async run(req: Request<{}, {}, TypeUser>, res: Response): Promise<void> {
    const token = req.headers.token as string;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    const user = decoded.payload;

    const favorites = await this.useCase.run(user.email);
    res.status(httpStatus.OK).send(favorites);
  }
}
