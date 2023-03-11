import { Definition } from 'node-dependency-injection';

import { DomainEvent } from '../../Modules/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../Modules/Shared/domain/DomainEventSubscriber';
// Domain
import { EventBus } from '../../Modules/Shared/domain/EventBus';
import container from './dependency-injection';
import { Server } from './server';

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

  async stop(): Promise<void> {
    return this.server?.stop();
  }

  private async configureEventBus() {
    const eventBus = container.get<EventBus>('Shared.domain.EventBus');

    eventBus.addSubscribers(this.findSubscribers());
  }

  private findSubscribers(): Array<DomainEventSubscriber<DomainEvent>> {
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<string, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: Definition, key: string) => {
      const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(key.toString());
      subscribers.push(domainEventSubscriber);
    });

    return subscribers;
  }
}
