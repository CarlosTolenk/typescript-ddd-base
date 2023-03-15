import { DomainEventSubscriberDummy } from '../../../__mocks__/DomainEventSubscriberDummy';
import { DomainEventSubscribers } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';
import { DomainEventDeserializer } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventDeserializer';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    const subscribers = new DomainEventSubscribers([dummySubscriber]);
    return DomainEventDeserializer.configure(subscribers);
  }
}
