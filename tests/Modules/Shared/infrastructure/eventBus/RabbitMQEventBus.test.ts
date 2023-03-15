import { MongoEnvironmentArranger } from '../persistence/mongo/MongoEnvironmentArranger';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';
import { RabbitMQConnectionMother } from './__mother__/RabbitMQConnectionMother';
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQEventBus } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQEventBus';
import { RabbitMqConnection } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { DomainEventSubscriberDummy } from '../../__mocks__/DomainEventSubscriberDummy';
import { RabbitMQConfigurer } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQConfigurer';
import { DomainEventFailoverPublisher } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { RabbitMQqueueFormatter } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQqueueFormatter';
import { DomainEventDummyMother } from '../../__mocks__/DomainEventDummy';
import { OrderCreatedDomainEventMother } from '../../../Orders/domain/OrderCreatedDomainEventMother';
import { UuidMother } from '../../domain/UuidMother';

describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events';
  let arranger: MongoEnvironmentArranger;

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(RabbitMQMongoClientMother.create());
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  afterAll(async () => {
    await arranger.close();
  });

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = RabbitMQConnectionMother.failOnPublish();
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble();
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = OrderCreatedDomainEventMother.create({
        aggregateId: UuidMother.random(),
        eventId: UuidMother.random(),
        description: '',
        amount: 450,
        occurredOn: new Date()
      });

      await eventBus.publish([event]);

      failoverPublisher.assertEventHasBeenPublished(event);
    });
  });

  describe('integration', () => {
    let connection: RabbitMqConnection;
    let dummySubscriber: DomainEventSubscriberDummy;
    let configurer: RabbitMQConfigurer;
    let failoverPublisher: DomainEventFailoverPublisher;
    const formatter = new RabbitMQqueueFormatter('app');

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
      failoverPublisher = DomainEventFailoverPublisherMother.create();

      configurer = new RabbitMQConfigurer(connection, formatter);
    });

    beforeEach(async () => {
      await arranger.arrange();
      dummySubscriber = new DomainEventSubscriberDummy();
    });

    afterAll(async () => {
      await cleanEnvironment();
      await connection.close();
    });

    it('should publish events to RabbitMQ', async () => {
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange });
      const event = DomainEventDummyMother.random();

      await configurer.configure({ exchange, subscribers: [dummySubscriber] });

      await eventBus.publish([event]);
    });

    async function cleanEnvironment() {
      await connection.deleteQueue(formatter.format(dummySubscriber.constructor.name));
    }
  });
});
