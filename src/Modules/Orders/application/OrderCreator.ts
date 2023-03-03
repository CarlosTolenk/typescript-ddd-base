import { Order } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';

export class OrderCreator {
	private readonly repository: OrderRepository;

	constructor(repository: OrderRepository) {
		this.repository = repository;
	}

	async run(id: string, amount: number): Promise<void> {
		const course = new Order({ id, amount });

		return this.repository.save(course);
	}
}
