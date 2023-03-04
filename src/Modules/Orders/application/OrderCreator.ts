import { Order } from '../domain/Order';
import { OrderRepository } from '../domain/OrderRepository';
import { CreateOrderRequest } from './CreateOrderRequest';

export class OrderCreator {
  private readonly repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async run(request: CreateOrderRequest): Promise<void> {
    const course = new Order({ id: request.id, amount: request.amount });

    return this.repository.save(course);
  }
}
