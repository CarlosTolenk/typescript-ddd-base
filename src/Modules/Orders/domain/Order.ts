import { OrderId } from './value-object/OrderId';
import { OrderAmount } from './value-object/OrderAmount';
import { OrderDescription } from './value-object/OrderDescription';
import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { OrderCreatedDomainEvent } from './OrderCreatedDomainEvent';

export class Order extends AggregateRoot {
  readonly id: OrderId;
  readonly amount: OrderAmount;
  readonly description: OrderDescription;

  constructor({ id, amount, description }: { id: OrderId; amount: OrderAmount; description: OrderDescription }) {
    super();
    this.id = id;
    this.amount = amount;
    this.description = description;
  }

  static create(id: OrderId, description: OrderDescription, amount: OrderAmount): Order {
    const order = new Order({ id, description, amount });

    order.record(
      new OrderCreatedDomainEvent({
        id: order.id.value,
        description: order.description.value,
        amount: order.amount.value
      })
    );

    return order;
  }

  static fromPrimitives(plainData: { id: string; amount: number; description: string }): Order {
    return new Order({
      id: new OrderId(plainData.id),
      amount: new OrderAmount(plainData.amount),
      description: new OrderDescription(plainData.description)
    });
  }

  toPrimitives(): { id: string; amount: number; description: string } {
    return {
      id: this.id.value,
      amount: this.amount.value,
      description: this.description.value
    };
  }
}
