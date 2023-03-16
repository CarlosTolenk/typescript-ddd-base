import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { OrderCreator } from '../../../../Modules/Orders/application/OrderCreator';
import { Controller } from '../Controller';

type OrderPutRequest = Request & {
  body: {
    id: string;
    amount: number;
    description: string;
  };
};

export class OrderPutController implements Controller {
  private readonly orderCreator: OrderCreator;

  constructor(orderCreator: OrderCreator) {
    this.orderCreator = orderCreator;
  }

  async run(req: OrderPutRequest, res: Response): Promise<void> {
    try {
      const { id, amount, description } = req.body;
      await this.orderCreator.run({ id, amount, description });
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
