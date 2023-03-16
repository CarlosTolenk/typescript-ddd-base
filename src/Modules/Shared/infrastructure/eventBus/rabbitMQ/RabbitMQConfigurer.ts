import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';

export class RabbitMQConfigurer {
  constructor(
    private readonly connection: RabbitMqConnection,
    private readonly queueNameFormatter: RabbitMQqueueFormatter
  ) {}

  async configure(params: { exchange: string; subscribers: Array<DomainEventSubscriber<DomainEvent>> }): Promise<void> {
    await this.connection.exchange({ name: params.exchange });

    for (const subscriber of params.subscribers) {
      await this.addQueue(subscriber, params.exchange);
    }
  }

  private async addQueue(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string) {
    const routingKeys = subscriber.subscribedTo().map(event => event.EVENT_NAME);
    const queue = this.queueNameFormatter.format(subscriber.constructor.name);

    await this.connection.queue({ routingKeys, name: queue, exchange });
  }
}