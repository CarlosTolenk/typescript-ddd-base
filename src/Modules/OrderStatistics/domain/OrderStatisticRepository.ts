import { Nullable } from '../../Shared/domain/Nullable';
import { OrderStatistics } from './OrderStatistics';

export interface OrderStatisticRepository {
  search(): Promise<Nullable<OrderStatistics>>;
  save(orderStatistic: OrderStatistics): Promise<void>;
}
