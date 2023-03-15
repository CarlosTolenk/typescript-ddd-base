import { DomainEventClass } from '../../../../src/Modules/Shared/domain/DomainEvent';
import { DomainEventDummy } from './DomainEventDummy';
import { DomainEventSubscriber } from '../../../../src/Modules/Shared/domain/DomainEventSubscriber';

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy];
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    // do nothing
  }
}
