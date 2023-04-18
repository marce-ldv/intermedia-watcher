import { Request, Response, Router } from 'express';

import StatusController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
  const controller = container.get<StatusController>('Apps.coins.controllers.StatusGetController');

  /**
   * @openapi
   * /status:
   *  get:
   *    tags:
   *      - Health
   *    description: Get the status of the application
   *    responses:
   *      200:
   */
  router.get('/status', (req: Request, res: Response) => {
    controller.run(req, res);
  });
};
