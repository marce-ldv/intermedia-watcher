import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { UserRegisterController } from '../controllers/User/UserRegisterController';
import { UserLoginController } from '../controllers/User/UserLoginController';
import { ToggleFavoritesController } from '../controllers/User/ToggleFavoritesController';
import { UserGetAllFavoritesController } from '../controllers/User/UserGetAllFavoritesController';

export const register = (router: Router): void => {
  const userRegisterController = container.get<UserRegisterController>('Apps.coins.controllers.UserRegisterController');
  const userLoginController = container.get<UserLoginController>('Apps.coins.controllers.UserLoginController');
  const toggleFavoritesController = container.get<ToggleFavoritesController>(
    'Apps.coins.controllers.ToggleFavoritesController'
  );
  const userGetAllFavoritesController = container.get<UserGetAllFavoritesController>(
    'Apps.coins.controllers.UserGetAllFavoritesController'
  );

  /**
   * @openapi
   * /user/register:
   *  post:
   *    tags:
   *    - User
   *    description: Register a new user.
   *    responses:
   *      200:
   *        description: A new user was registered.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: string
   *                  description: The id of the user.
   *                  example: 1
   *                  required: true
   *                username:
   *                  type: string
   *                  description: The username of the user.
   *                  example: user1
   *                  required: true
   *                  minLength: 3
   *                symbol:
   *                  type: string
   *                  description: The symbol of the coin.
   *                  example: BTC
   *                  required: true
   *                canFavorite:
   *                  type: boolean
   *                  description: Whether the user can favorite coins.
   *                  example: true
   *                  required: true
   */
  router.post('/user/register', (req: Request, res: Response) => userRegisterController.run(req, res));
  /**
   * @openapi
   * /user/login:
   *  post:
   *    tags:
   *      - User
   *    description: Login a user.
   */
  router.post('/user/login', (req: Request, res: Response) => userLoginController.run(req, res));
  /**
   * @openapi
   * user/favorites:
   *  post:
   *    tags:
   *    - User
   *    description: Toggle a coin as a favorite for a user.
   *    responses:
   *     200:
   *       description: A coin was added to the user's favorites.
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: string
   *                description: The id of the user.
   *                example: 1
   *                required: true
   *                minLength: 3
   *              symbol:
   *                type: string
   *                description: The symbol of the coin.
   *                example: BTC
   *                required: true
   *              canFavorite:
   *                type: boolean
   *                description: Whether the user can favorite coins.
   *                example: true
   *                required: true
   *              favorites:
   *                type: array
   *                description: The list of favorite coins.
   *                example: ['BTC', 'ETH']
   *                required: true
   */
  router.post('/user/favorites', (req: Request, res: Response) => toggleFavoritesController.run(req, res));
  /**
   * @openapi
   * user/favorites:
   *  get:
   *    tags:
   *    - User
   *    description: Get all favorites for a user.
   */
  router.get('/user/favorites', (req: Request, res: Response) => userGetAllFavoritesController.run(req, res));
};
