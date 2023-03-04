import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderRepository } from '../../../../src/Modules/Orders/domain/OrderRepository';

export class OrderRepositoryMock implements OrderRepository {
	private readonly saveMock: jest.Mock;

	constructor() {
		this.saveMock = jest.fn();
	}

	async save(order: Order): Promise<void> {
		this.saveMock(order);
	}

	assertSaveHaveBeenCalledWith(expected: Order): void {
		expect(this.saveMock).toHaveBeenCalledWith(expected);
	}
}
