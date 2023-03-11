import { OrderCreator } from '../../../../src/Modules/Orders/application/OrderCreator';
import { OrderAmountNotZero } from '../../../../src/Modules/Orders/domain/exceptions/OrderAmountNotZero';
import { OrderDescriptionLengthExceeded } from '../../../../src/Modules/Orders/domain/exceptions/OrderDescriptionLengthExceeded';
import EventBusMock from '../__mocks__/EventBusMock';
// Mocks
import { OrderRepositoryMock } from '../__mocks__/OrderRepositoryMock';
import { OrderCreatedDomainEventMother } from '../domain/OrderCreatedDomainEventMother';
import { OrderMother } from '../domain/OrderMother';
import { CreateOrderRequestMother } from './CreateOrderRequestMother';

let repository: OrderRepositoryMock;
let creator: OrderCreator;
let eventBus: EventBusMock;

beforeEach(() => {
  repository = new OrderRepositoryMock();
  eventBus = new EventBusMock();
  creator = new OrderCreator(repository, eventBus);
});

describe('OrderCreator', () => {
  it('should create a valid order', async () => {
    const request = CreateOrderRequestMother.random();
    const order = OrderMother.fromRequest(request);
    const domainEvent = OrderCreatedDomainEventMother.fromOrder(order);

    await creator.run(request);

    repository.assertSaveHaveBeenCalledWith(order);
    eventBus.assertLastPublishedEventIs(domainEvent);
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
