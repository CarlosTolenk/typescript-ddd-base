import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { OrderStatisticFinder } from '../../../../Modules/OrderStatistics/application/Find/OrderStatisticFinder';
import { OrderStatisticNotExist } from '../../../../Modules/OrderStatistics/domain/exception/OrderStatisticNotExist';
import { Controller } from '../Controller';

export class OrderStatisticGetController implements Controller {
	constructor(private readonly orderStatisticFinder: OrderStatisticFinder) {}

	async run(req: Request, res: Response): Promise<void> {
		try {
			const statisticOrder = await this.orderStatisticFinder.run();
			res
				.status(200)
				.json({ total: statisticOrder.total, totalAmount: statisticOrder.totalAmount });
		} catch (error) {
			if (error instanceof OrderStatisticNotExist) {
				res.sendStatus(httpStatus.NOT_FOUND);
			} else {
				res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
