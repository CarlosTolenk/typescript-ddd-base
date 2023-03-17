import { DomainEventFailoverPublisher } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventFailoverPublisher';
import { RabbitMQConfigurer } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQEventBus';
import { RabbitMQqueueFormatter } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQqueueFormatter';
import { MongoEnvironmentArranger } from '../persistence/mongo/MongoEnvironmentArranger';
import { DomainEventSubscribers } from '../../../../../src/Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';

// Mocks
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { RabbitMQConnectionMother } from './__mother__/RabbitMQConnectionMother';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';
import { DomainEventDummyMother } from '../../__mocks__/DomainEventDummy';
import { DomainEventSubscriberDummy } from '../../__mocks__/DomainEventSubscriberDummy';
import { OrderStatisticIncrementedDomainEventMock } from '../../../OrderStatistics/domain/OrderStatisticIncrementedDomainEventMock';

describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events';
  let arranger: MongoEnvironmentArranger;
  const queueNameFormatter = new RabbitMQqueueFormatter('mooc');

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
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange, queueNameFormatter });
      const event = OrderStatisticIncrementedDomainEventMock.create();

      await eventBus.publish([event]);

      failoverPublisher.assertEventHasBeenPublished(event);
    });
  });

  describe('integration', () => {
    let connection: RabbitMqConnection;
    let dummySubscriber: DomainEventSubscriberDummy;
    let configurer: RabbitMQConfigurer;
    let failoverPublisher: DomainEventFailoverPublisher;
    let subscribers: DomainEventSubscribers;

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create();
      failoverPublisher = DomainEventFailoverPublisherMother.create();

      configurer = new RabbitMQConfigurer(connection, queueNameFormatter);
    });

    beforeEach(async () => {
      await arranger.arrange();
      dummySubscriber = new DomainEventSubscriberDummy();
      subscribers = new DomainEventSubscribers([dummySubscriber]);
    });

    afterAll(async () => {
      await cleanEnvironment();
      await connection.close();
    });

    it('should consume the events published to RabbitMQ', async () => {
      await configurer.configure({ exchange, subscribers: [dummySubscriber] });
      const eventBus = new RabbitMQEventBus({ failoverPublisher, connection, exchange, queueNameFormatter });
      await eventBus.addSubscribers(subscribers);
      const event = DomainEventDummyMother.random();

      await eventBus.publish([event]);

      await dummySubscriber.assertConsumedEvents([event]);
    });

    async function cleanEnvironment() {
      await connection.deleteQueue(queueNameFormatter.format(dummySubscriber));
    }
  });
});
