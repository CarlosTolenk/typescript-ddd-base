import { OrderId } from '../../../../src/Modules/Orders/domain/value-object/OrderId';
import { UuidMother } from '../../Shared/domain/UuidMother';

export class OrderIdMother {
  static create(value: string): OrderId {
    return new OrderId(value);
  }

  static random(): OrderId {
    return this.create(UuidMother.random());
  }
}
