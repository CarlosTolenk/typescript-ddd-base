import BSON from 'bson';
import * as fs from 'fs';

import { OrderRepository } from '../../domain/OrderRepository';
import { Order } from '../../domain/Order';

export class FileOrderRepository implements OrderRepository {
  private FILE_PATH = `${__dirname}/orders`;
  async save(order: Order): Promise<void> {
    return fs.promises.writeFile(this.filePath(order.id), BSON.serialize(order));
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
