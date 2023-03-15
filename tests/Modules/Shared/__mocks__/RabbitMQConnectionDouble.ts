import { RabbitMQConnection } from '../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';

export class RabbitMQConnectionDouble extends RabbitMQConnection {
  async publish(params: any): Promise<boolean> {
    throw new Error();
  }
}
