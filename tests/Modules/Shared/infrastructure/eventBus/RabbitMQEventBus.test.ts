import { RabbitMqConnection } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQEventBus';
import { OrderCreatedDomainEventMother } from '../../../Orders/domain/OrderCreatedDomainEventMother';

describe('RabbitMQEventBus test', () => {
  const config = {
    connectionSettings: {
      username: 'guest',
      password: 'guest',
      vhost: '/',
      connection: {
        secure: false,
        hostname: 'localhost',
        port: 5672
      }
    },
    exchangeSettings: { name: '' }
  };

  let connection: RabbitMqConnection;

  beforeAll(async () => {
    connection = new RabbitMqConnection(config);
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should publish events to RabbitMQ', async () => {
    const eventBus = new RabbitMQEventBus({ connection });

    await eventBus.publish([OrderCreatedDomainEventMother.random()]);
  });
});
