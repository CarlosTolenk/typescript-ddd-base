import { OrderId } from '../../../Orders/domain/value-object/OrderId';
import { OrderStatisticRepository } from '../../domain/OrderStatisticRepository';
import { EventBus } from '../../../Shared/domain/EventBus';
import { OrderStatistics } from '../../domain/OrderStatistics';
import { OrderStatisticsId } from '../../domain/value-object/OrderStatisticsId';

export class OrderStatisticIncrementer {
  private readonly repository: OrderStatisticRepository;
  private readonly eventBus: EventBus;
  constructor(repository: OrderStatisticRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(orderId: OrderId, amount: number) {
    const statistic = (await this.repository.search()) || this.initializeCounter();

    statistic.increment(orderId, amount);

    await this.repository.save(statistic);
    await this.eventBus.publish(statistic.pullDomainEvents());
  }

  private initializeCounter(): OrderStatistics {
    return OrderStatistics.initialize(OrderStatisticsId.random());
  }
}
