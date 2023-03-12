import { OrderStatisticRepository } from '../../domain/OrderStatisticRepository';
import { OrderStatisticNotExist } from '../../domain/exception/OrderStatisticNotExist';
import httpStatus from 'http-status';

export class OrderStatisticFinder {
  private readonly repository: OrderStatisticRepository;
  constructor(repository: OrderStatisticRepository) {
    this.repository = repository;
  }

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new OrderStatisticNotExist(
        'There are no statistics for this order',
        httpStatus.NOT_FOUND,
        'OrderStatisticFinder',
        this.constructor.name,
        'run',
        2000
      );
    }

    return { total: counter.total.value, totalAmount: counter.totalAmount.value };
  }
}
