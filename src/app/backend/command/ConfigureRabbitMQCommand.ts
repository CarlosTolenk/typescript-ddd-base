import container from '../dependency-injection';

// Infrastructure
import { DomainEventSubscribers } from '../../../Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQqueueFormatter } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQqueueFormatter';
import { RabbitMQConfig } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQConfigFactory';

class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Shared.RabbitMQConnection');
    const nameFormatter = container.get<RabbitMQqueueFormatter>('Shared.RabbitMQqueueFormatter');
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>('Shared.RabbitMQConfig');

    await connection.connect();

    const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl);
    const subscribers = DomainEventSubscribers.from(container).items;

    await configurer.configure({ exchange: exchangeSettings.name, subscribers });
  }
}

ConfigureRabbitMQCommand.run()
  .then(() => {
    console.log('RabbitMQ Configuration success');
    process.exit(0);
  })
  .catch(error => {
    console.log('RabbitMQ Configuration fail', error);
    process.exit(1);
  });
