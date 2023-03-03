import { serialize, deserialize } from 'bson';
import * as fs from 'fs';

import { OrderRepository } from '../../domain/OrderRepository';
import { Order } from '../../domain/Order';

export class FileOrderRepository implements OrderRepository {
  private FILE_PATH = `${__dirname}/orders`;
  async save(order: Order): Promise<void> {
    return fs.promises.writeFile(this.filePath(order.id), serialize(order));
  }

  async search(courseId: string): Promise<Order> {
    const courseData = await fs.promises.readFile(this.filePath(courseId));
    const { id, amount } = deserialize(courseData);
    return new Order({ id, amount });
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
