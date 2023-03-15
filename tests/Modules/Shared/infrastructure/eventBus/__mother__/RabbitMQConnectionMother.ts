import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother';
import { RabbitMQConnection } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQConnectionDouble } from '../../../__mocks__/RabbitMQConnectionDouble';

export class RabbitMQConnectionMother {
  static async create() {
    const config = RabbitMQConnectionConfigurationMother.create();
    const connection = new RabbitMQConnection(config);
    await connection.connect();
    return connection;
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create());
  }
}
