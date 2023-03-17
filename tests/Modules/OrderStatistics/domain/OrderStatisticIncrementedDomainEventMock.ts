import { OrderStatisticIncrementedDomainEvent } from '../../../../src/Modules/OrderStatistics/domain/OrderStatisticIncrementedDomainEvent';
import { OrderStatistics } from '../../../../src/Modules/OrderStatistics/domain/OrderStatistics';
import { DomainEvent } from '../../../../src/Modules/Shared/domain/DomainEvent';
import { OrderStatisticMother } from './OrderStatisticMother';

export class OrderStatisticIncrementedDomainEventMock {
  static create(): DomainEvent {
    return OrderStatisticIncrementedDomainEventMock.fromOrderStatistic(OrderStatisticMother.random());
  }
  static fromOrderStatistic(statistic: OrderStatistics): OrderStatisticIncrementedDomainEvent {
    return new OrderStatisticIncrementedDomainEvent({
      aggregateId: statistic.id.value,
      total: statistic.total.value,
      totalAmount: statistic.totalAmount.value
    });
  }
}
