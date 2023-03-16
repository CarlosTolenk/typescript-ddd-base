import { OrderStatisticsAmount } from '../../../../src/Modules/OrderStatistics/domain/value-object/OrderStatisticsAmount';
import { IntegerMother } from '../../Shared/domain/IntegerMother';

export class OrderStatisticsAmountMother {
	static random() {
		return new OrderStatisticsAmount(IntegerMother.random({ min: 1, max: 100000 }));
	}
}
