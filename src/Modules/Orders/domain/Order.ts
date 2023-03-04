import { OrderId } from './value-object/OrderId';

export class Order {
	readonly id: OrderId;
	readonly amount: number;

	constructor({ id, amount }: { id: OrderId; amount: number }) {
		this.id = id;
		this.amount = amount;
	}
}
