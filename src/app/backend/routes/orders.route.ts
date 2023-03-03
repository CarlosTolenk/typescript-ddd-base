import { Request, Response, Router } from 'express';

import { OrderPutController } from '../controllers/order/OrderPutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
  const coursePutController = container.get<OrderPutController>('App.controllers.order.OrderPutController');
  router.put('/order/:id', (req: Request, res: Response) => coursePutController.run(req, res));
};
