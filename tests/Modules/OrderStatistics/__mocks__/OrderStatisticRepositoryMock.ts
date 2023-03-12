import { OrderStatisticRepository } from '../../../../src/Modules/OrderStatistics/domain/OrderStatisticRepository';
import { OrderStatistics } from '../../../../src/Modules/OrderStatistics/domain/OrderStatistics';
import { Nullable } from '../../../../src/Modules/Shared/domain/Nullable';

export class OrderStatisticRepositoryMock implements OrderStatisticRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private orderStatistic: Nullable<OrderStatistics> = null;

  async save(orderStatistic: OrderStatistics): Promise<void> {
    this.mockSave(orderStatistic);
  }

  async search(): Promise<Nullable<OrderStatistics>> {
    this.mockSearch();
    return this.orderStatistic;
  }

  returnOnSearch(statistics: OrderStatistics) {
    this.orderStatistic = statistics;
  }
  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled();
  }

  assertNotSave() {
    expect(this.mockSave).toHaveBeenCalledTimes(0);
  }

  assertLastOrderStatisticSaved(orderStatistic: OrderStatistics) {
    const mock = this.mockSave.mock;
    const lastOrderStatistic = mock.calls[mock.calls.length - 1][0] as OrderStatistics;
    const { id: id1, ...statisticPrimitives } = orderStatistic.toPrimitives();
    const { id: id2, ...lastSavedPrimitives } = lastOrderStatistic.toPrimitives();

    expect(lastOrderStatistic).toBeInstanceOf(OrderStatistics);
    expect(lastSavedPrimitives).toEqual(statisticPrimitives);
  }
}
