import { Order } from '../../../../../src/Modules/Orders/domain/Order';
import { OrderAmount } from '../../../../../src/Modules/Orders/domain/value-object/OrderAmount';
import { OrderDescription } from '../../../../../src/Modules/Orders/domain/value-object/OrderDescription';
// Value Object
import { OrderId } from '../../../../../src/Modules/Orders/domain/value-object/OrderId';
import { FileOrderRepository } from '../../../../../src/Modules/Orders/infrastructure/persistence/FileOrderRepository';

describe('FileOrderRepository', () => {
  it('should save a order', async () => {
    const repository = new FileOrderRepository();
    const expectedOrder = new Order({
      id: new OrderId('0766c602-d4d4-48b6-9d50-d3253123275e'),
      amount: new OrderAmount(1545),
      description: new OrderDescription('The order description')
    });

    await repository.save(expectedOrder);

    const order = await repository.search('0766c602-d4d4-48b6-9d50-d3253123275e');
    expect(order).toEqual(expectedOrder);
  });
});
