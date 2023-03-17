import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
import { RabbitMQConfig } from './RabbitMQConfigFactory';
import { RabbitMQEventBus } from './RabbitMQEventBus';

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries
    });
  }
}
