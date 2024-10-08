import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher';
import { DomainEventJsonSerializer } from '../DomainEventJsonSerializer';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
import { RabbitMQConsumer } from './RabbitMQConsumer';
import { DomainEventDeserializer } from '../DomainEventDeserializer';

export class RabbitMQEventBus implements EventBus {
  private readonly failoverPublisher: DomainEventFailoverPublisher;
  private readonly connection: RabbitMqConnection;
  private readonly exchange: string;
  private queueNameFormatter: RabbitMQqueueFormatter;
  private readonly maxRetries: Number;

  constructor(params: {
    failoverPublisher: DomainEventFailoverPublisher;
    connection: RabbitMqConnection;
    exchange: string;
    queueNameFormatter: RabbitMQqueueFormatter;
    maxRetries: Number;
  }) {
    const { failoverPublisher, connection, exchange, queueNameFormatter, maxRetries } = params;
    this.failoverPublisher = failoverPublisher;
    this.connection = connection;
    this.exchange = exchange;
    this.queueNameFormatter = queueNameFormatter;
    this.maxRetries = maxRetries;
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers);
    this.failoverPublisher.setDeserializer(deserializer);
    const maxRetries = this.maxRetries;

    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber);
      const rabbitMQConsumer = new RabbitMQConsumer({subscriber, deserializer, maxRetries});

      await this.connection.consume(this.exchange, queueName, rabbitMQConsumer);
    }
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = this.toBuffer(event);
        const options = this.options(event);

        await this.connection.publish({ exchange: this.exchange, routingKey, content, options });
      } catch (error: any) {
        await this.failoverPublisher.publish(event);
      }
    }
  }

  private options(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8'
    };
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }
}
