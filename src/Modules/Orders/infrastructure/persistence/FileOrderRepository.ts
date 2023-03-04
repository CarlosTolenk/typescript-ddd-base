import { deserialize, serialize } from 'bson';
import * as fs from 'fs';

import { Order } from '../../domain/Order';
import { OrderRepository } from '../../domain/OrderRepository';

export class FileOrderRepository implements OrderRepository {
	private readonly FILE_PATH = `${__dirname}/orders`;
	async save(order: Order): Promise<void> {
		return fs.promises.writeFile(this.filePath(order.id.value), serialize(order));
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
