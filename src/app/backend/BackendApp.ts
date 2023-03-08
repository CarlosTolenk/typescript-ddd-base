import { Definition } from 'node-dependency-injection';

// Domain
import { EventBus } from '../../Modules/Shared/domain/EventBus';
import { DomainEventSubscriber } from '../../Modules/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '../../Modules/Shared/domain/DomainEvent';

import { Server } from './server';
import container from './dependency-injection';

export class BackendApp {
  server?: Server;

  async start(): Promise<void> {
    const port = process.env.PORT ?? '5500';
    this.server = new Server(port);

    await this.configureEventBus();

    return this.server.listen();
  }

  get httpServer(): Server['httpServer'] | undefined {
    return this.server?.getHTTPServer();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Shared.domain.EventBus');

    eventBus.addSubscribers(this.findSubscribers());
  }

  private findSubscribers(): Array<DomainEventSubscriber<DomainEvent>> {
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: Definition, key: String) => {
      const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return subscribers;
  }

  async stop(): Promise<void> {
    return this.server?.stop();
  }
}
