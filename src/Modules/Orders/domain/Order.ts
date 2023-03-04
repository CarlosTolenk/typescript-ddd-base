import { OrderId } from './value-object/OrderId';
import { OrderAmount } from './value-object/OrderAmount';
import { OrderDescription } from './value-object/OrderDescription';

export class Order {
  readonly id: OrderId;
  readonly amount: OrderAmount;
  readonly description: OrderDescription;

  constructor({ id, amount, description }: { id: OrderId; amount: OrderAmount; description: OrderDescription }) {
    this.id = id;
    this.amount = amount;
    this.description = description;
  }
}
