// Domain
import { EventBus } from '../../Modules/Shared/domain/EventBus';
// Infrastructure
import { DomainEventSubscribers } from '../../Modules/Shared/infrastructure/eventBus/DomainEventSubscribers';
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

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}
