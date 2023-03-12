import { IntegerMother } from '../../Shared/domain/IntegerMother';
import { OrderStatisticsTotal } from '../../../../src/Modules/OrderStatistics/domain/value-object/OrderStatisticsTotal';

export class OrderStatisticsTotalMother {
  static random() {
    return new OrderStatisticsTotal(IntegerMother.random({ min: 1, max: 100000 }));
  }
}
