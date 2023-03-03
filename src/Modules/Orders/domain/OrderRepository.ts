import { Order } from './Order';

export interface OrderRepository {
	save(course: Order): Promise<void>;
}
