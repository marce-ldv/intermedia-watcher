import type { Request, Response } from 'express';
import httpStatus from 'http-status';

import { Controller } from './Controller';
import {UserRegister} from "../../../../Contexts/CoinsCtx/Auth/application/UserRegister";

export class UserRegisterController implements Controller {
  private readonly useCase: UserRegister;

  constructor(useCase: UserRegister) {
    this.useCase = useCase;
  }

	async run(req: Request, res: Response): Promise<void> {
    const response = await this.useCase.run();
		res.status(httpStatus.OK).send(response);
	}
}
