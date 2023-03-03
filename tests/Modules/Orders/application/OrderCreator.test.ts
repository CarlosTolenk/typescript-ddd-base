import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';
import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';

let repository: OrderRepositoryMock;
let creator: OrderCreator;

beforeEach(() => {
	repository = new OrderRepositoryMock();
	creator = new OrderCreator(repository);
});

describe('OrderCreator', () => {
	it('should create a valid order', async () => {
		const id = 'some-id';
		const amount = 1520;

		const order = new Order({ id, amount });

		await creator.run(id, amount);

		repository.assertSaveHaveBeenCalledWith(order);
	});
});
