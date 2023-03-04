import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';
import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
// Mocks
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';

let repository: OrderRepositoryMock;
let creator: OrderCreator;

beforeEach(() => {
	repository = new OrderRepositoryMock();
	creator = new OrderCreator(repository);
});

describe('OrderCreator', () => {
	it('should create a valid order', async () => {
		const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
		const amount = 1520;
		const expectedOrder = new Order({ id: new OrderId(id), amount });

		await creator.run({ id, amount });

		repository.assertSaveHaveBeenCalledWith(expectedOrder);
	});
});
