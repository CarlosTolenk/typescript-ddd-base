import { OrderStatistics } from '../../../../src/Modules/OrderStatistics/domain/OrderStatistics';
import { OrderStatisticIncrementedDomainEvent } from '../../../../src/Modules/OrderStatistics/domain/OrderStatisticIncrementedDomainEvent';

export class OrderStatisticIncrementedDomainEventMock {
  static fromOrderStatistic(statistic: OrderStatistics): OrderStatisticIncrementedDomainEvent {
    return new OrderStatisticIncrementedDomainEvent({
      aggregateId: statistic.id.value,
      total: statistic.total.value,
      totalAmount: statistic.totalAmount.value
    });
  }
}
