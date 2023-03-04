import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
import { OrderAmount } from '../../../../src/Modules/Orders/domain/value-object/OrderAmount';
import { OrderDescription } from '../../../../src/Modules/Orders/domain/value-object/OrderDescription';
import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { CreateOrderRequest } from '../../../../src/Modules/Orders/application/CreateOrderRequest';
import { OrderIdMother } from './OrderIdMother';
import { OrderAmountMother } from './OrderAmountMother';
import { OrderDescriptionMother } from './OrderDescriptionMother';

export class OrderMother {
  static create(id: OrderId, amount: OrderAmount, description: OrderDescription): Order {
    return new Order({ id, amount, description });
  }

  static fromRequest(request: CreateOrderRequest): Order {
    return this.create(
      OrderIdMother.create(request.id),
      OrderAmountMother.create(request.amount),
      OrderDescriptionMother.create(request.description)
    );
  }

  static random(): Order {
    return this.create(OrderIdMother.random(), OrderAmountMother.random(), OrderDescriptionMother.random());
  }
}
