import { EnvironmentArranger } from '../../Shared/infrastructure/arranger/EnvironmentArranger';
import container from '../../../../src/app/backend/dependency-injection';
import { OrderStatisticRepository } from '../../../../src/Modules/OrderStatistics/domain/OrderStatisticRepository';
import { OrderStatisticMother } from '../domain/OrderStatisticMother';

const environmentArranger: Promise<EnvironmentArranger> = container.get('Shared.EnvironmentArranger');
const repository: OrderStatisticRepository = container.get('Modules.OrderStatistics.domain.OrderStatisticsRepository');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('OrderStatisticRepository', () => {
  describe('#save', () => {
    it('should save a order statistic', async () => {
      const orderStatistic = OrderStatisticMother.random();

      await repository.save(orderStatistic);
    });
  });

  describe('#search', () => {
    it('should return an existing order', async () => {
      const expectedStatistic = OrderStatisticMother.random();
      await repository.save(expectedStatistic);

      const statistic = await repository.search();

      expect(expectedStatistic).toEqual(statistic);
    });

    it('should not return null if there is no order statistic', async () => {
      expect(await repository.search()).toBeFalsy();
    });
  });
});
