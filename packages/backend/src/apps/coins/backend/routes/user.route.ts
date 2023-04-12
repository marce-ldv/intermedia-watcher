import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { UserRegisterController } from '../controllers/User/UserRegisterController';
import { UserLoginController } from '../controllers/User/UserLoginController';
import { ToggleFavoritesController } from "../controllers/User/ToggleFavoritesController";
import {UserGetAllFavoritesController} from "../controllers/User/UserGetAllFavoritesController";

export const register = (router: Router): void => {
  const userRegisterController = container.get<UserRegisterController>('Apps.coins.controllers.UserRegisterController');
  const userLoginController = container.get<UserLoginController>('Apps.coins.controllers.UserLoginController');
  const toggleFavoritesController = container.get<ToggleFavoritesController>('Apps.coins.controllers.ToggleFavoritesController');
  const userGetAllFavoritesController = container.get<UserGetAllFavoritesController>('Apps.coins.controllers.UserGetAllFavoritesController');

  router.post('/user/register', (req: Request, res: Response) => userRegisterController.run(req, res));
  router.post('/user/login', (req: Request, res: Response) => userLoginController.run(req, res));
  router.post('/user/favorites', (req: Request, res: Response) => toggleFavoritesController.run(req, res));
  router.get('/user/favorites', (req: Request, res: Response) => userGetAllFavoritesController.run(req, res));
};
