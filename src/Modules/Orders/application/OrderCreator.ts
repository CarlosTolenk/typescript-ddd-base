import { Order } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';
import { CreateOrderRequest } from './CreateOrderRequest';

// Value Object
import { OrderDescription } from '../domain/value-object/OrderDescription';
import { OrderAmount } from '../domain/value-object/OrderAmount';
import { OrderId } from '../domain/value-object/OrderId';

export class OrderCreator {
  private readonly repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async run(request: CreateOrderRequest): Promise<void> {
    const course = new Order({
      id: new OrderId(request.id),
      amount: new OrderAmount(request.amount),
      description: new OrderDescription(request.description)
    });

    return this.repository.save(course);
  }
}
