import { Order } from '../../../../src/Modules/Orders/domain/Order';
import { OrderRepository } from '../../../../src/Modules/Orders/domain/OrderRepository';

export class OrderRepositoryMock implements OrderRepository {
  private readonly mockSave = jest.fn();

  async save(order: Order): Promise<void> {
    await this.mockSave(order);
  }

  assertLastSavedOrderIs(expected: Order): void {
    const mock = this.mockSave.mock;
    const lastSavedOrder = (mock.calls[mock.calls.length - 1] as Order[])[0];
    expect(lastSavedOrder).toBeInstanceOf(Order);
    expect(lastSavedOrder.id).toEqual(expected.id);
  }
}
