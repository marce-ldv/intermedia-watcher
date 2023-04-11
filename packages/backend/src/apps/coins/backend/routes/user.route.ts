import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { UserRegisterController } from '../controllers/User/UserRegisterController';
import { UserLoginController } from '../controllers/User/UserLoginController';
import { AddFavoritesController } from "../controllers/User/AddFavoritesController";

export const register = (router: Router): void => {
  const userRegisterController = container.get<UserRegisterController>('Apps.coins.controllers.UserRegisterController');
  const userLoginController = container.get<UserLoginController>('Apps.coins.controllers.UserLoginController');
  const addFavoritesController = container.get<AddFavoritesController>('Apps.coins.controllers.AddFavoritesController');

  router.post('/user/register', (req: Request, res: Response) => userRegisterController.run(req, res));
  router.post('/user/login', (req: Request, res: Response) => userLoginController.run(req, res));
  router.post('/user/favorites', (req: Request, res: Response) => addFavoritesController.run(req, res));
};
