import { OrderStatisticsTotalMother } from './OrderStatisticsTotalMother';
import { OrderStatisticsAmountMother } from './OrderStatisticsAmountMother';
import { OrderStatistics } from '../../../../src/Modules/OrderStatistics/domain/OrderStatistics';
import { OrderIdMother } from '../../Orders/domain/OrderIdMother';
import { Repeater } from '../../Shared/domain/Repeater';
import { OrderStatisticsId } from '../../../../src/Modules/OrderStatistics/domain/value-object/OrderStatisticsId';
import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
import { OrderStatisticsTotal } from '../../../../src/Modules/OrderStatistics/domain/value-object/OrderStatisticsTotal';
import { OrderStatisticsAmount } from '../../../../src/Modules/OrderStatistics/domain/value-object/OrderStatisticsAmount';

export class OrderStatisticMother {
  static random(): OrderStatistics {
    const total = OrderStatisticsTotalMother.random();
    const totalAmount = OrderStatisticsAmountMother.random();
    return new OrderStatistics(
      OrderStatisticsId.random(),
      total,
      totalAmount,
      Repeater.random(OrderIdMother.random.bind(OrderIdMother), total.value)
    );
  }
  static withOne(orderId: OrderId): OrderStatistics {
    return new OrderStatistics(
      OrderStatisticsId.random(),
      new OrderStatisticsTotal(1),
      new OrderStatisticsAmount(100),
      [orderId]
    );
  }
}
