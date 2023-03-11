import { Nullable } from '../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Order } from '../../domain/Order';
import { OrderRepository } from '../../domain/OrderRepository';
import { OrderId } from '../../domain/value-object/OrderId';

interface OrderDocument {
  _id: string;
  amount: number;
  description: string;
}

export class MongoOrderRepository extends MongoRepository<Order> implements OrderRepository {
  public async save(order: Order): Promise<void> {
    return this.persist(order.id.value, order);
  }

  public async search(id: OrderId): Promise<Nullable<Order>> {
    const collection = await this.collection();
    // @ts-ignore
    const document = await collection.findOne<OrderDocument>({ _id: id.value });

    return document
      ? Order.fromPrimitives({
          amount: document.amount,
          description: document.description,
          id: id.value
        })
      : null;
  }

  protected collectionName(): string {
    return 'orders';
  }
}
