import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';

// Mocks
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';
import { OrderDescriptionLengthExceeded } from '../../../../src/Modules/Orders/domain/exceptions/OrderDescriptionLengthExceeded';
import { OrderAmountNotZero } from '../../../../src/Modules/Orders/domain/exceptions/OrderAmountNotZero';
import { CreateOrderRequestMother } from './CreateOrderRequestMother';
import { OrderMother } from '../domain/OrderMother';

let repository: OrderRepositoryMock;
let creator: OrderCreator;

beforeEach(() => {
  repository = new OrderRepositoryMock();
  creator = new OrderCreator(repository);
});

describe('OrderCreator', () => {
  it('should create a valid order', async () => {
    const request = CreateOrderRequestMother.random();
    const order = OrderMother.fromRequest(request);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(order);
  });

  it('should throw error if order description length is exceeded', () => {
    const request = CreateOrderRequestMother.invalidDescriptionRequest();

    expect(() => {
      const expectedOrder = OrderMother.fromRequest(request);

      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(expectedOrder);
    }).toThrow(OrderDescriptionLengthExceeded);
  });

  it('should throw error if order amount is zero or negative', () => {
    const request = CreateOrderRequestMother.invalidAmountRequest();

    expect(() => {
      const expectedOrder = OrderMother.fromRequest(request);

      creator.run(request);

      repository.assertSaveHaveBeenCalledWith(expectedOrder);
    }).toThrow(OrderAmountNotZero);
  });
});
