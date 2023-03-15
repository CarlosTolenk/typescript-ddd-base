import { ConnectionSettings } from './ConnectionSettings';
import { ExchangeSetting } from './ExchangeSetting';
import config from '../../config';

export class RabbitMQConfigFactory {
  static createConfig(): { connectionSettings: ConnectionSettings; exchangeSettings: ExchangeSetting } {
    return config.get('rabbitmq');
  }
}
