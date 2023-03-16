import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
  public constructor(value: number) {
    super(value);
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }
}
