import { Request, Response, Router } from 'express';

import { OrderStatisticGetController } from '../controllers/orderStatistic/OrderStatisticGetController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
  const orderStatisticGetController = container.get<OrderStatisticGetController>(
    'App.controllers.orderStatistic.OrderStatisticGetController'
  );
  router.get('/order-statistic', (req: Request, res: Response) => orderStatisticGetController.run(req, res));
};
