import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { OrderDescriptionLengthExceeded } from '../exceptions/OrderDescriptionLengthExceeded';

export class OrderDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new OrderDescriptionLengthExceeded(
        `The Order Description <${value}> has more than 30 characters`,
        400,
        'ValueObject',
        this.constructor.name,
        'ensureLengthIsLessThan30Characters',
        1100
      );
    }
  }
}
