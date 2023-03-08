import { OrderCreatedDomainEvent } from '../domain/OrderCreatedDomainEvent';
import { DomainEventSubscriber } from '../../Shared/domain/DomainEventSubscriber';
import { DomainEventClass } from '../../Shared/domain/DomainEvent';

export class IncrementAmountOrderOnOrderCreated implements DomainEventSubscriber<OrderCreatedDomainEvent> {
  subscribedTo(): Array<DomainEventClass> {
    return [OrderCreatedDomainEvent];
  }
  on(domainEvent: OrderCreatedDomainEvent): Promise<void> {
    console.log('IncrementAmountOrderOnOrderCreated');
    return Promise.resolve(undefined);
  }
}
