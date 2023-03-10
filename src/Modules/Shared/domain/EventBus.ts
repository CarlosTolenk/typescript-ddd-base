import { DomainEvent } from './DomainEvent';
import { DomainEventSubscribers } from '../infrastructure/eventBus/DomainEventSubscribers';

export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
  addSubscribers(subscribers: DomainEventSubscribers): void;
}
