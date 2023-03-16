import { OrderAmount } from '../../../../src/Modules/Orders/domain/value-object/OrderAmount';
import { IntegerMother } from '../../Shared/domain/IntegerMother';

export class OrderAmountMother {
  static create(value: number): OrderAmount {
    return new OrderAmount(value);
  }

  static random(): OrderAmount {
    return this.create(IntegerMother.random({ min: 1, max: 100000 }));
  }

  static invalidAmount(): number {
    return 0;
  }
}
