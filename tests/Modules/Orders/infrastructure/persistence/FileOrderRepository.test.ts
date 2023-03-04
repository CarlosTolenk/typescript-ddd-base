import { Order } from '../../../../../src/Modules/Orders/domain/Order';
import { FileOrderRepository } from '../../../../../src/Modules/Orders/infrastructure/persistence/FileOrderRepository';
import { OrderId } from '../../../../../src/Modules/Orders/domain/value-object/OrderId';

describe('FileOrderRepository', () => {
  it('should save a course', async () => {
    const repository = new FileOrderRepository();
    const expectedCourse = new Order({ id: new OrderId('0766c602-d4d4-48b6-9d50-d3253123275e'), amount: 1450 });

    await repository.save(expectedCourse);

    const course = await repository.search('0766c602-d4d4-48b6-9d50-d3253123275e');
    expect(course).toEqual(expectedCourse);
  });
});
