import { OrderDescription } from '../../../../src/Modules/Orders/domain/value-object/OrderDescription';
import { WordMother } from '../../Shared/domain/WordMother';

export class OrderDescriptionMother {
  static create(value: string): OrderDescription {
    return new OrderDescription(value);
  }

  static random(): OrderDescription {
    return this.create(WordMother.random({ maxLength: 20 }));
  }

  static invalidDescription(): string {
    return 'a'.repeat(40);
  }
}
