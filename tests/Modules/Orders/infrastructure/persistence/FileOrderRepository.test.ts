import { FileOrderRepository } from '../../../../../src/Modules/Orders/infrastructure/persistence/FileOrderRepository';
import { Order } from '../../../../../src/Modules/Orders/domain/Order';

describe('FileOrderRepository', () => {
  it('should save a course', async () => {
    const repository = new FileOrderRepository();
    const expectedCourse = new Order({ id: 'id', amount: 1450 });

    await repository.save(expectedCourse);

    const course = await repository.search('id');
    expect(course).toEqual(expectedCourse);
  });
});
