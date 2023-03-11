import { OrderCreatedDomainEvent } from '../../../Orders/domain/OrderCreatedDomainEvent';
import { DomainEventClass } from '../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Shared/domain/DomainEventSubscriber';

export class IncrementAmountOrderOnOrderCreated implements DomainEventSubscriber<OrderCreatedDomainEvent> {
  subscribedTo(): Array<DomainEventClass> {
    return [OrderCreatedDomainEvent];
  }

  async on(domainEvent: OrderCreatedDomainEvent): Promise<void> {
    console.log('IncrementAmountOrderOnOrderCreated');

    return Promise.resolve(undefined);
  }
}
