import { Given } from 'cucumber';
import container from '../../../../../src/app/backend/dependency-injection';
import { EventBus } from '../../../../../src/Modules/Shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';
import { DomainEventDeserializer } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventDeserializer';

const eventBus = container.get('Shared.domain.EventBus') as EventBus;
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);

  await eventBus.publish([domainEvent!]);
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);

  return DomainEventDeserializer.configure(subscribers);
}
