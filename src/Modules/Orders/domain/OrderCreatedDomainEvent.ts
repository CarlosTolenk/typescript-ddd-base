import { DomainEvent } from '../../Shared/domain/DomainEvent';

type CreateOrderDomainEventAttributes = {
	readonly description: string;
	readonly amount: number;
	readonly eventName: string;
};

export class OrderCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'order.created';

	readonly description: string;
	readonly amount: number;

	constructor({
		aggregateId,
		description,
		amount,
		eventId,
		occurredOn
	}: {
		aggregateId: string;
		eventId?: string;
		description: string;
		amount: number;
		occurredOn?: Date;
	}) {
		super({ eventName: OrderCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
		this.description = description;
		this.amount = amount;
	}

	toPrimitives(): CreateOrderDomainEventAttributes {
		const { description, amount } = this;

		return {
			description,
			amount,
			eventName: OrderCreatedDomainEvent.EVENT_NAME
		};
	}

	static fromPrimitives(params: {
		aggregateId: string;
		attributes: CreateOrderDomainEventAttributes;
		eventId: string;
		occurredOn: Date;
	}): DomainEvent {
		const { aggregateId, attributes, occurredOn, eventId } = params;

		return new OrderCreatedDomainEvent({
			aggregateId,
			description: attributes.description,
			amount: attributes.amount,
			eventId,
			occurredOn
		});
	}
}
