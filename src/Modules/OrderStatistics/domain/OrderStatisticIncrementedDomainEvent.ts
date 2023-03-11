import { DomainEvent } from '../../Shared/domain/DomainEvent';

type CoursesCounterIncrementedAttributes = { total: number; totalAmount: number };

export class OrderStatisticIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'courses_counter.incremented';
  readonly total: number;
  readonly totalAmount: number;

  constructor(data: { aggregateId: string; total: number; totalAmount: number; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super({ eventName: OrderStatisticIncrementedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.total = data.total;
    this.totalAmount = data.totalAmount;
  }

  toPrimitives() {
    return {
      total: this.total,
      totalAmount: this.totalAmount
    };
  }

  static fromPrimitives(params: {
    aggregateId: string;
    attributes: CoursesCounterIncrementedAttributes;
    eventId: string;
    occurredOn: Date;
  }) {
    const { aggregateId, attributes, eventId, occurredOn } = params;
    return new OrderStatisticIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      totalAmount: attributes.totalAmount,
      eventId,
      occurredOn
    });
  }
}
