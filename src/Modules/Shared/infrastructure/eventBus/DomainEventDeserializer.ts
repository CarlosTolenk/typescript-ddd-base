import { DomainEventClass } from '../../domain/DomainEvent';
import { DomainEventSubscribers } from './DomainEventSubscribers';

type DomainEventJSON = {
  type: string;
  aggregateId: string;
  attributes: any;
  id: string;
  occurred_on: string;
};

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscribers) {
    const mapping = new DomainEventDeserializer();
    subscribers.items.forEach(subscriber => {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
    });

    return mapping;
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME;
    this.set(eventName, domainEvent);
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON;
    const eventName = eventData.type;
    const eventClass = super.get(eventName);

    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${eventName}`);
    }

    return eventClass.fromPrimitives({
      aggregateId: eventData.aggregateId,
      attributes: eventData.attributes,
      occurredOn: new Date(eventData.occurred_on),
      eventId: eventData.id
    });
  }
}
