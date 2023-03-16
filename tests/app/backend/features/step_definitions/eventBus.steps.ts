import { Given } from 'cucumber';

import container from '../../../../../src/app/backend/dependency-injection';
import { DomainEventDeserializer } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventDeserializer';
import { DomainEventSubscribers } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';

const eventBus = container.get('Shared.domain.EventBus');
const deserializer = buildDeserializer();

Given('I send an event to the event bus:', async (event: any) => {
	const domainEvent = deserializer.deserialize(event);

	await eventBus.publish([domainEvent]);
	await wait(200);
});

function buildDeserializer() {
	const subscribers = DomainEventSubscribers.from(container);

	return DomainEventDeserializer.configure(subscribers);
}

async function wait(milliseconds: number) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}
