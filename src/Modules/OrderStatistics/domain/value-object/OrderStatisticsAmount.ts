import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject';

export class OrderStatisticsAmount extends NumberValueObject {
  increment(amount: number): OrderStatisticsAmount {
    return new OrderStatisticsAmount(this.value + amount);
  }
  static initialize(): OrderStatisticsAmount {
    return new OrderStatisticsAmount(0);
  }
}
