import { OrderStatisticRepositoryMock } from '../../__mocks__/OrderStatisticRepositoryMock';
import { OrderStatisticFinder } from '../../../../../src/Modules/OrderStatistics/application/Find/OrderStatisticFinder';
import { OrderStatisticNotExist } from '../../../../../src/Modules/OrderStatistics/domain/exception/OrderStatisticNotExist';
import { OrderStatisticMother } from '../../domain/OrderStatisticMother';

describe('OrderStatisticFinder', () => {
  let repository: OrderStatisticRepositoryMock;

  beforeEach(() => {
    repository = new OrderStatisticRepositoryMock();
  });

  it('should find an existing order statistic', async () => {
    const statistic = OrderStatisticMother.random();
    repository.returnOnSearch(statistic);
    const finder = new OrderStatisticFinder(repository);

    const response = await finder.run();

    repository.assertSearch();
    expect(statistic.total.value).toEqual(response.total);
    expect(statistic.totalAmount.value).toEqual(response.totalAmount);
  });

  it('should throw an exception when order statistic does not exists', async () => {
    const finder = new OrderStatisticFinder(repository);

    await expect(finder.run()).rejects.toBeInstanceOf(OrderStatisticNotExist);
  });
});
