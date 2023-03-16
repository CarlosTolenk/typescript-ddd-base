import { DomainEventFailoverPublisher } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { DomainEventFailoverPublisherDouble } from '../../../__mocks__/DomainEventFailoverPublisherDouble';
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother';
import { RabbitMQMongoClientMother } from './RabbitMQMongoClientMother';

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMongoClientMother.create();

    return new DomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create());
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble();
  }
}
