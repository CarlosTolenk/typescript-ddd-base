import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
import { RabbitMQExchangeNameFormatter } from './RabbitMQExchangeNameFormatter';

export class RabbitMQConfigurer {
  constructor(
    private readonly connection: RabbitMqConnection,
    private readonly queueNameFormatter: RabbitMQqueueFormatter,
    private messageRetryTtl: number
  ) {}

  async configure(params: { exchange: string; subscribers: Array<DomainEventSubscriber<DomainEvent>> }): Promise<void> {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(params.exchange);
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(params.exchange);

    await this.connection.exchange({ name: params.exchange });
    await this.connection.exchange({ name: retryExchange });
    await this.connection.exchange({ name: deadLetterExchange });

    for (const subscriber of params.subscribers) {
      await this.addQueue(subscriber, params.exchange);
    }
  }

  private async addQueue(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string) {
    const retryExchange = RabbitMQExchangeNameFormatter.retry(exchange);
    const deadLetterExchange = RabbitMQExchangeNameFormatter.deadLetter(exchange);

    const routingKeys = subscriber.subscribedTo().map(event => event.EVENT_NAME);
    const queue = this.queueNameFormatter.format(subscriber);
    routingKeys.push(queue);
    const deadLetterQueue = this.queueNameFormatter.formatDeadLetter(subscriber);
    const retryQueue = this.queueNameFormatter.formatRetry(subscriber);

    await this.connection.queue({ routingKeys, name: queue, exchange });
    await this.connection.queue({
      routingKeys: [queue],
      name: retryQueue,
      exchange: retryExchange,
      messageTtl: this.messageRetryTtl,
      deadLetterExchange: exchange,
      deadLetterQueue: queue
    });
    await this.connection.queue({ routingKeys: [queue], name: deadLetterQueue, exchange: deadLetterExchange });
  }
}
