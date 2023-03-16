import container from '../../../../../src/app/backend/dependency-injection';
import { OrderRepository } from '../../../../../src/Modules/Orders/domain/OrderRepository';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { OrderMother } from '../../domain/OrderMother';

const repository: OrderRepository = container.get('Modules.Orders.domain.OrderRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
	'Shared.EnvironmentArranger'
);

beforeEach(async () => {
	await (await environmentArranger).arrange();
});

afterAll(async () => {
	await (await environmentArranger).close();
});

describe('CourseRepository', () => {
	describe('#save', () => {
		it('should save a course', async () => {
			const course = OrderMother.random();

			await repository.save(course);
		});
	});
});
