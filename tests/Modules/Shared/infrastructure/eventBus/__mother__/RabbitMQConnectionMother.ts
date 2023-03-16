import { RabbitMqConnection } from '../../../../../../src/Modules/Shared/infrastructure/eventBus/rabbitMQ/RabbitMqConnection';
import { RabbitMQConnectionDouble } from '../../../__mocks__/RabbitMQConnectionDouble';
import { RabbitMQConnectionConfigurationMother } from './RabbitMQConnectionConfigurationMother';

export class RabbitMQConnectionMother {
	static async create() {
		const config = RabbitMQConnectionConfigurationMother.create();
		const connection = new RabbitMqConnection(config);
		await connection.connect();

		return connection;
	}

	static failOnPublish() {
		return new RabbitMQConnectionDouble(RabbitMQConnectionConfigurationMother.create());
	}
}
