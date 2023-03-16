import { OrderId } from '../../../Orders/domain/value-object/OrderId';
import { EventBus } from '../../../Shared/domain/EventBus';
import { OrderStatisticRepository } from '../../domain/OrderStatisticRepository';
import { OrderStatistics } from '../../domain/OrderStatistics';
import { OrderStatisticsId } from '../../domain/value-object/OrderStatisticsId';
import { UseCase } from '../../../Shared/domain/UseCase';

interface OrderStatisticIncrementerRequest {
  orderId: OrderId;
  amount: number;
}

export class OrderStatisticIncrementer implements UseCase<OrderStatisticIncrementerRequest, void> {
  private readonly repository: OrderStatisticRepository;
  private readonly eventBus: EventBus;
  constructor(repository: OrderStatisticRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({ orderId, amount }: OrderStatisticIncrementerRequest): Promise<void> {
    const statistic = (await this.repository.search()) || this.initializeCounter();

    statistic.increment(orderId, amount);

    await this.repository.save(statistic);
    await this.eventBus.publish(statistic.pullDomainEvents());
  }

  private initializeCounter(): OrderStatistics {
    return OrderStatistics.initialize(OrderStatisticsId.random());
  }
}
