import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject';
import { OrderAmountNotZero } from '../exceptions/OrderAmountNotZero';

export class OrderAmount extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureAmountLess0Amount(value);
  }

  private ensureAmountLess0Amount(value: number): void {
    if (value <= 0) {
      throw new OrderAmountNotZero('The order cannot have an amount of zero', this.constructor.name);
    }
  }
}
