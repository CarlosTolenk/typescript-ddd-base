import { RabbitMqConnection } from '../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';

export class RabbitMQConnectionDouble extends RabbitMqConnection {
	async publish(params: any): Promise<boolean> {
		throw new Error();
	}
}
