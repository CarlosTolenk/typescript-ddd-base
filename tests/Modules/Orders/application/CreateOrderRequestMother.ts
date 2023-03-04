import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
import { OrderAmount } from '../../../../src/Modules/Orders/domain/value-object/OrderAmount';
import { OrderDescription } from '../../../../src/Modules/Orders/domain/value-object/OrderDescription';
import { OrderIdMother } from '../domain/OrderIdMother';
import { OrderAmountMother } from '../domain/OrderAmountMother';
import { OrderDescriptionMother } from '../domain/OrderDescriptionMother';
import { CreateOrderRequest } from '../../../../src/Modules/Orders/application/CreateOrderRequest';

export class CreateOrderRequestMother {
  static create(id: OrderId, amount: OrderAmount, description: OrderDescription): CreateOrderRequest {
    return { id: id.value, amount: amount.value, description: description.value };
  }

  static random(): CreateOrderRequest {
    return this.create(OrderIdMother.random(), OrderAmountMother.random(), OrderDescriptionMother.random());
  }

  static invalidAmountRequest(): CreateOrderRequest {
    return {
      id: OrderIdMother.random().value,
      amount: OrderAmountMother.invalidAmount(),
      description: OrderDescriptionMother.random().value
    };
  }

  static invalidDescriptionRequest(): CreateOrderRequest {
    return {
      id: OrderIdMother.random().value,
      amount: OrderAmountMother.random().value,
      description: OrderDescriptionMother.invalidDescription()
    };
  }
}
