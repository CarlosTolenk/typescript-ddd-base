import ConfigEnv from '../../../Modules/Shared/infrastructure/config';
import { DomainEventSubscribers } from '../../../Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';
import { RabbitMQConfigurer } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQConfigurer';
import { RabbitMqConnection } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQqueueFormatter } from '../../../Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMQqueueFormatter';
import container from '../dependency-injection';

class ConfigureRabbitMQCommand {
  static async run() {
    const connection = container.get<RabbitMqConnection>('Mooc.Shared.RabbitMQConnection');
    await connection.connect();

    const nameFormatter = container.get<RabbitMQqueueFormatter>('Mooc.Shared.RabbitMQQueueFormatter');
    const configurer = new RabbitMQConfigurer(connection, nameFormatter);
    const subscribers = DomainEventSubscribers.from(container).items;
    const exchange = ConfigEnv.get('rabbitmq').exchangeSettings.name;

    await configurer.configure({ exchange, subscribers });
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
