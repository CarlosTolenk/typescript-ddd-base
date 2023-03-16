import { OrderStatisticNotExist } from '../../domain/exception/OrderStatisticNotExist';
import { OrderStatisticRepository } from '../../domain/OrderStatisticRepository';
import { UseCase } from '../../../Shared/domain/UseCase';

interface ResponseOrderStatisticFinder {
  total: number;
  totalAmount: number;
}

export class OrderStatisticFinder implements UseCase<any, ResponseOrderStatisticFinder> {
  private readonly repository: OrderStatisticRepository;
  constructor(repository: OrderStatisticRepository) {
    this.repository = repository;
  }

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new OrderStatisticNotExist('There are no statistics for this order', this.constructor.name);
    }

    return { total: counter.total.value, totalAmount: counter.totalAmount.value };
  }
}
