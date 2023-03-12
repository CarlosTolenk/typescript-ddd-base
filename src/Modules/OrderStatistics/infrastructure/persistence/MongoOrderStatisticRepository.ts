import { MongoRepository } from '../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { OrderStatistics } from '../../domain/OrderStatistics';
import { OrderStatisticRepository } from '../../domain/OrderStatisticRepository';
import { Nullable } from '../../../Shared/domain/Nullable';

interface OrderStatisticDocument {
  _id: string;
  total: number;
  totalAmount: number;
  existingOrders: string[];
}

export class MongoOrderStatisticRepository
  extends MongoRepository<OrderStatistics>
  implements OrderStatisticRepository
{
  protected collectionName(): string {
    return 'orderStatistics';
  }

  save(orderStatistic: OrderStatistics): Promise<void> {
    return this.persist(orderStatistic.id.value, orderStatistic);
  }

  async search(): Promise<Nullable<OrderStatistics>> {
    const collection = await this.collection();

    const document = await collection.findOne<OrderStatisticDocument>({});
    return document ? OrderStatistics.fromPrimitives({ ...document, id: document._id }) : null;
  }
}
