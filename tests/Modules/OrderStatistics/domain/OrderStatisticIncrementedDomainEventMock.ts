import { OrderStatisticIncrementedDomainEvent } from '../../../../src/Modules/OrderStatistics/domain/OrderStatisticIncrementedDomainEvent';
import { OrderStatistics } from '../../../../src/Modules/OrderStatistics/domain/OrderStatistics';

export class OrderStatisticIncrementedDomainEventMock {
	static fromOrderStatistic(statistic: OrderStatistics): OrderStatisticIncrementedDomainEvent {
		return new OrderStatisticIncrementedDomainEvent({
			aggregateId: statistic.id.value,
			total: statistic.total.value,
			totalAmount: statistic.totalAmount.value
		});
	}
}
