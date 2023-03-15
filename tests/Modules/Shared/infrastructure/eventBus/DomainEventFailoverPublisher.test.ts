import { MongoEnvironmentArranger } from '../persistence/mongo/MongoEnvironmentArranger';
import { DomainEventFailoverPublisher } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';
import { DomainEventDeserializerMother } from './__mother__/DomainEventDeserializerMother';
import { DomainEventDummyMother } from '../../__mocks__/DomainEventDummy';

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MongoEnvironmentArranger;
  const mongoClient = RabbitMQMongoClientMother.create();
  const deserializer = DomainEventDeserializerMother.create();

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(mongoClient);
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save the published events', async () => {
    const eventBus = new DomainEventFailoverPublisher(mongoClient, deserializer);
    const event = DomainEventDummyMother.random();

    await eventBus.publish(event);

    expect(await eventBus.consume()).toEqual([event]);
  });
});
