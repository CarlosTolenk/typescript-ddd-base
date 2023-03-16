import { DomainEventClass } from '../../../../src/Modules/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../src/Modules/Shared/domain/DomainEventSubscriber';
import { DomainEventDummy } from './DomainEventDummy';

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy];
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    // do nothing
  }
}
