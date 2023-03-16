import { NumberValueObject } from '../../../Shared/domain/value-object/NumberValueObject';

export class OrderStatisticsTotal extends NumberValueObject {
  increment(): OrderStatisticsTotal {
    return new OrderStatisticsTotal(this.value + 1);
  }

  static initialize(): OrderStatisticsTotal {
    return new OrderStatisticsTotal(0);
  }
}
