import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { OrderStatisticsId } from './value-object/OrderStatisticsId';
import { OrderStatisticsTotal } from './value-object/OrderStatisticsTotal';
import { OrderId } from '../../Orders/domain/value-object/OrderId';
import { OrderStatisticsAmount } from './value-object/OrderStatisticsAmount';
import { OrderStatisticIncrementedDomainEvent } from './OrderStatisticIncrementedDomainEvent';

export class OrderStatistics extends AggregateRoot {
  readonly id: OrderStatisticsId;
  private _total: OrderStatisticsTotal;
  private _totalAmount: OrderStatisticsAmount;
  readonly existingOrders: Array<OrderId>;

  constructor(
    id: OrderStatisticsId,
    total: OrderStatisticsTotal,
    totalAmount: OrderStatisticsAmount,
    existingOrders?: Array<OrderId>
  ) {
    super();
    this.id = id;
    this._total = total;
    this._totalAmount = totalAmount;
    this.existingOrders = existingOrders || [];
  }

  public get total(): OrderStatisticsTotal {
    return this._total;
  }

  public get totalAmount(): OrderStatisticsAmount {
    return this._totalAmount;
  }

  increment(orderId: OrderId, amount: number) {
    this._total = this.total.increment();
    this._totalAmount = this.totalAmount.increment(amount);
    this.existingOrders.push(orderId);
    this.record(
      new OrderStatisticIncrementedDomainEvent({
        aggregateId: this.id.value,
        total: this.total.value,
        totalAmount: this.totalAmount.value
      })
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      totalAmount: this.totalAmount.value,
      existingOrders: this.existingOrders.map(orderId => orderId.value)
    };
  }

  static initialize(id: OrderStatisticsId): OrderStatistics {
    return new OrderStatistics(id, OrderStatisticsTotal.initialize(), OrderStatisticsAmount.initialize());
  }

  static fromPrimitives(data: {
    id: string;
    total: number;
    totalAmount: number;
    existingOrders: string[];
  }): OrderStatistics {
    return new OrderStatistics(
      new OrderStatisticsId(data.id),
      new OrderStatisticsTotal(data.total),
      new OrderStatisticsAmount(data.totalAmount),
      data.existingOrders.map(entry => new OrderId(entry))
    );
  }
}
