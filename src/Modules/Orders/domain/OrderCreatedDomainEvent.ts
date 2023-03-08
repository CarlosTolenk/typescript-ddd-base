import { DomainEvent } from '../../Shared/domain/DomainEvent';

type CreateOrderDomainEventAttributes = {
  readonly description: string;
  readonly amount: number;
  readonly eventName: string;
  readonly id: string;
};

export class OrderCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'order.created';

  readonly description: string;
  readonly amount: number;

  constructor({
    id,
    description,
    amount,
    eventId,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    description: string;
    amount: number;
    occurredOn?: Date;
  }) {
    super({ eventName: OrderCreatedDomainEvent.EVENT_NAME, aggregateId: id, eventId, occurredOn });
    this.description = description;
    this.amount = amount;
  }

  toPrimitives(): CreateOrderDomainEventAttributes {
    const { description, amount, aggregateId } = this;
    return {
      description,
      amount,
      eventName: OrderCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(params: {
    id: string;
    attributes: CreateOrderDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    const { id, attributes, occurredOn, eventId } = params;
    return new OrderCreatedDomainEvent({
      id,
      description: attributes.description,
      amount: attributes.amount,
      eventId,
      occurredOn
    });
  }
}
