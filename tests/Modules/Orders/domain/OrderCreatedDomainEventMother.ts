import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderCreatedDomainEvent } from '../../../../src/Modules/Orders/domain/OrderCreatedDomainEvent';
import { CreateOrderRequestMother } from '../application/CreateOrderRequestMother';
import { OrderMother } from './OrderMother';

export class OrderCreatedDomainEventMother {
  static create({
    id,
    eventId,
    description,
    amount,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    description: string;
    amount: number;
    occurredOn?: Date;
  }): OrderCreatedDomainEvent {
    return new OrderCreatedDomainEvent({
      id,
      eventId,
      description,
      amount,
      occurredOn
    });
  }

  static random(): OrderCreatedDomainEvent {
    const request = CreateOrderRequestMother.random();
    const order = OrderMother.fromRequest(request);

    return OrderCreatedDomainEventMother.fromOrder(order);
  }

  static fromOrder(order: Order): OrderCreatedDomainEvent {
    return new OrderCreatedDomainEvent({
      id: order.id.value,
      description: order.description.value,
      amount: order.amount.value
    });
  }
}
