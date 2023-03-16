import { OrderCreatedDomainEvent } from '../../../Orders/domain/OrderCreatedDomainEvent';
import { OrderId } from '../../../Orders/domain/value-object/OrderId';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';
import { OrderStatisticIncrementer } from './OrderStatisticIncrementer';

export class OrderCounterOnOrderCreated implements DomainEventSubscriber<OrderCreatedDomainEvent> {
	// @ts-ignore
	private readonly incrementer: OrderStatisticIncrementer;

	constructor(incrementer: OrderStatisticIncrementer) {
		this.incrementer = incrementer;
	}

	subscribedTo(): Array<DomainEventClass> {
		return [OrderCreatedDomainEvent];
	}

	async on(domainEvent: OrderCreatedDomainEvent): Promise<void> {
		await this.incrementer.run(new OrderId(domainEvent.aggregateId), domainEvent.amount);
	}
}
