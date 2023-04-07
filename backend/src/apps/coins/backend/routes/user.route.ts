import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import {UserRegisterController} from "../controllers/UserRegisterController";

export const register = (router: Router): void => {
  const userRegisterController = container.get<UserRegisterController>(
    'Apps.coins.controllers.UserRegisterController'
  );

	router.post('/user/register', (req: Request, res: Response) => userRegisterController.run(req, res));
};
