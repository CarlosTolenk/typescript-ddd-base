import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';
import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';

let repository: OrderRepositoryMock;
let creator: OrderCreator;

beforeEach(() => {
	repository = new OrderRepositoryMock();
	creator = new OrderCreator(repository);
});

describe('CourseCreator', () => {
	it('should create a valid course', async () => {
		const id = 'some-id';
		const name = 'some-name';
		const duration = 'some-duration';

		const course = new Order({ id, name, duration });

		await creator.run(id, name, duration);

		repository.assertLastSavedOrderIs(course);
	});
});
