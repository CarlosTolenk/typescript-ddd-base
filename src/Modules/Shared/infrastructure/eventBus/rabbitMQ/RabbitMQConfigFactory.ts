import config from '../../config';
import { ConnectionSettings } from './ConnectionSettings';
import { ExchangeSetting } from './ExchangeSetting';

export class RabbitMQConfigFactory {
	static createConfig(): {
		connectionSettings: ConnectionSettings;
		exchangeSettings: ExchangeSetting;
	} {
		return config.get('rabbitmq');
	}
}
