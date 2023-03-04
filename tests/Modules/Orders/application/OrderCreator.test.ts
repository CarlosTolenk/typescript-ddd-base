import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';
import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
// Mocks
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';
import { OrderAmount } from '../../../../src/Modules/Orders/domain/value-object/OrderAmount';
import { OrderDescription } from '../../../../src/Modules/Orders/domain/value-object/OrderDescription';
import { OrderDescriptionLengthExceeded } from '../../../../src/Modules/Orders/domain/exceptions/OrderDescriptionLengthExceeded';
import { OrderAmountNotZero } from '../../../../src/Modules/Orders/domain/exceptions/OrderAmountNotZero';

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
    const description = 'Order Description';
    const expectedOrder = new Order({
      id: new OrderId(id),
      amount: new OrderAmount(amount),
      description: new OrderDescription(description)
    });

    await creator.run({ id, amount, description });

    repository.assertSaveHaveBeenCalledWith(expectedOrder);
  });

  it('should throw error if order description length is exceeded', () => {
    const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
    const amount = 1520;
    const description = 'some-description'.repeat(30);

    expect(() => {
      const expectedOrder = new Order({
        id: new OrderId(id),
        amount: new OrderAmount(amount),
        description: new OrderDescription(description)
      });

      creator.run({ id, amount, description });

      repository.assertSaveHaveBeenCalledWith(expectedOrder);
    }).toThrow(OrderDescriptionLengthExceeded);
  });

  it('should throw error if order amount is zero or negative', () => {
    const id = '0766c602-d4d4-48b6-9d50-d3253123275e';
    const amount = 0;
    const description = 'some-description';

    expect(() => {
      const expectedOrder = new Order({
        id: new OrderId(id),
        amount: new OrderAmount(amount),
        description: new OrderDescription(description)
      });

      creator.run({ id, amount, description });

      repository.assertSaveHaveBeenCalledWith(expectedOrder);
    }).toThrow(OrderAmountNotZero);
  });
});
