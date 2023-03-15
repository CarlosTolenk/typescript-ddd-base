import { DomainEventDeserializerMother } from './DomainEventDeserializerMother';
import { DomainEventFailoverPublisher } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { RabbitMQMongoClientMother } from './RabbitMQMongoClientMother';
import { DomainEventFailoverPublisherDouble } from '../../../__mocks__/DomainEventFailoverPublisherDouble';

export class DomainEventFailoverPublisherMother {
  static create() {
    const mongoClient = RabbitMQMongoClientMother.create();
    return new DomainEventFailoverPublisher(mongoClient, DomainEventDeserializerMother.create());
  }

  static failOverDouble() {
    return new DomainEventFailoverPublisherDouble();
  }
}
