import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderRepository } from '../../../../src/Modules/Orders/domain/OrderRepository';

export class CourseRepositoryMock implements OrderRepository {
	private readonly mockSave = jest.fn();

	async save(course: Order): Promise<void> {
		await this.mockSave(course);
	}

	assertLastSavedCourseIs(expected: Order): void {
		const mock = this.mockSave.mock;
		const lastSavedCourse = (mock.calls[mock.calls.length - 1] as Order[])[0];
		expect(lastSavedCourse).toBeInstanceOf(Order);
		expect(lastSavedCourse.id).toEqual(expected.id);
	}
}
