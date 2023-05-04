import { isNil, isNumber } from '../../../utils/type-checkers';
import { FieldValidationError } from '../errors';
import { NumberValueObject } from './number-value-object';

export class TimestampValueObject extends NumberValueObject {
  static override create(property: string, value: number) {
    if (isNil(value)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isNumber(value)) {
      throw new FieldValidationError(`Property ${property} must be a number`);
    }

    return new TimestampValueObject(value);
  }

  static override createOptional(property: string, value?: number) {
    if (isNil(value)) {
      return undefined;
    }

    if (!isNumber(value)) {
      throw new FieldValidationError(`Property ${property} must be a number`);
    }

    return new TimestampValueObject(value);
  }
}
