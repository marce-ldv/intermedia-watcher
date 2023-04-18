import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import { CoinGetAllController } from '../controllers/Coins/CoinGetAllController';
import { CoinGetTrendingController } from '../controllers/Coins/CoinGetTrendingController';
import { CoinAddCoinController } from '../controllers/Coins/CoinAddCoinController';
import { CoinRemoveCoinController } from '../controllers/Coins/CoinRemoveCoinController';
import { CoinUpdateCoinController } from '../controllers/Coins/CoinUpdateCoinController';

export const register = (router: Router): void => {
  const coinGetAllController = container.get<CoinGetAllController>('Apps.coins.controllers.CoinGetAllController');
  const coinGetTrendingController = container.get<CoinGetTrendingController>(
    'Apps.coins.controllers.CoinGetTrendingController'
  );
  const coinAddCoinController = container.get<CoinAddCoinController>('Apps.coins.controllers.CoinAddCoinController');
  const coinRemoveCoinController = container.get<CoinRemoveCoinController>(
    'Apps.coins.controllers.CoinRemoveCoinController'
  );
  const coinUpdateCoinController = container.get<CoinUpdateCoinController>(
    'Apps.coins.controllers.CoinUpdateCoinController'
  );

  // @openapi is a custom decorator that is used to generate the OpenAPI documentation.

  /**
   * @openapi
   * /coins/all:
   *  get:
   *    description: Returns a list of all coins.
   *    responses:
   *      200:
   *        description: A list of all coins.
   */
  router.get('/coins/all', (req: Request, res: Response) => coinGetAllController.run(req, res));
  /**
   * @openapi
   * /coins/trending:
   *   get:
   *     description: Returns a trending coins.
   *     responses:
   *       200:
   *        description: A list of trending coins.
   */
  router.get('/coins/trending', (req: Request, res: Response) => coinGetTrendingController.run(req, res));
  /**
   * @openapi
   * /coins/add:
   *    post:
   *      description: Add a coin to the database.
   *      responses:
   *        200:
   *          description: A coin was added to the database.
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  id:
   *                    type: string
   *                    description: The coin id.
   *                    example: bitcoin
   *                    required: true
   *                    nullable: false
   *                    unique: true
   *                  name:
   *                    type: string
   *                    description: The coin name.
   *                    example: Bitcoin
   *                    required: true
   *                  logo:
   *                    type: string
   *                    description: The coin logo.
   *                    example: https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579
   *                    required: true
   *                  symbol:
   *                    type: string
   *                    description: The coin symbol.
   *                    example: BTC
   *                    required: true
   *                  canFavorite:
   *                    type: boolean
   *                    description: The coin can be favorited.
   *                    example: true
   *                    required: true
   */
  router.post('/coins/add', (req: Request, res: Response) => coinAddCoinController.run(req, res));
  /**
   * @openapi
   * /coins/remove:
   *   delete:
   *   description: Remove a coin from the database.
   *   responses:
   *    200:
   *      description: A coin was removed from the database.
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: string
   *                description: The coin id.
   *                example: bitcoin
   *                required: true
   *              name:
   *                type: string
   *                description: The coin name.
   *                example: Bitcoin
   *                required: true
   *              logo:
   *                type: string
   *                description: The coin logo.
   *                example: https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579
   *                required: true
   *              symbol:
   *                type: string
   *                description: The coin symbol.
   *                example: BTC
   *                required: true
   *              canFavorite:
   *                type: boolean
   *                description: The coin can be favorited.
   *                example: true
   *                required: true
   */
  router.delete('/coins/remove', (req: Request, res: Response) => coinRemoveCoinController.run(req, res));
  /**
   * @openapi
   * /coins/update:
   *  put:
   *   description: Update a coin in the database.
   *   responses:
   *    200:
   *      description: A coin was updated in the database.
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              id:
   *                type: string
   *                description: The coin id.
   *                example: bitcoin
   *                required: true
   *
   */
  router.put('/coins/update', (req: Request, res: Response) => coinUpdateCoinController.run(req, res));
};
