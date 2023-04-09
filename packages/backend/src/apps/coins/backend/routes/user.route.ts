import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { UserRegisterController } from '../controllers/UserRegisterController';
import { UserLoginController } from '../controllers/UserLoginController';

export const register = (router: Router): void => {
  const userRegisterController = container.get<UserRegisterController>('Apps.coins.controllers.UserRegisterController');
  const userLoginController = container.get<UserLoginController>('Apps.coins.controllers.UserLoginController');

  router.post('/user/register', (req: Request, res: Response) => userRegisterController.run(req, res));
  router.post('/user/login', (req: Request, res: Response) => userLoginController.run(req, res));
};
