import { Request, Response, Router } from 'express';

import { OrderPostController } from '../controllers/order/OrderPostController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
  const orderPostController = container.get<OrderPostController>('App.controllers.order.OrderPostController');
  router.put('/order', (req: Request, res: Response) => orderPostController.run(req, res));
};
