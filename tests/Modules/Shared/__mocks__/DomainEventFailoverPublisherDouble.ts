import { DomainEventFailoverPublisher } from '../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { DomainEvent } from '../../../../src/Modules/Shared/domain/DomainEvent';
import { RabbitMQMongoClientMother } from '../infrastructure/eventBus/__mother__/RabbitMQMongoClientMother';
import { DomainEventDeserializerMother } from '../infrastructure/eventBus/__mother__/DomainEventDeserializerMother';

export class DomainEventFailoverPublisherDouble extends DomainEventFailoverPublisher {
  private readonly publishMock: jest.Mock;
  constructor() {
    super(RabbitMQMongoClientMother.create(), DomainEventDeserializerMother.create());
    this.publishMock = jest.fn();
  }

  async publish(event: DomainEvent): Promise<void> {
    this.publishMock(event);
  }

  assertEventHasBeenPublished(event: DomainEvent) {
    expect(this.publishMock).toHaveBeenCalledWith(event);
  }
}
