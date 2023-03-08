import { Order } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';
import { CreateOrderRequest } from './CreateOrderRequest';

// Value Object
import { OrderDescription } from '../domain/value-object/OrderDescription';
import { OrderAmount } from '../domain/value-object/OrderAmount';
import { OrderId } from '../domain/value-object/OrderId';
import { EventBus } from '../../Shared/domain/EventBus';

export class OrderCreator {
  private readonly repository: OrderRepository;
  private readonly eventBus: EventBus;

  constructor(repository: OrderRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(request: CreateOrderRequest): Promise<void> {
    const order = Order.create(
      new OrderId(request.id),
      new OrderDescription(request.description),
      new OrderAmount(request.amount)
    );

    await this.repository.save(order);
    await this.eventBus.publish(order.pullDomainEvents());
  }
}
