import { v4 as uuidV4, validate } from 'uuid';
import { hasValue, isEmpty, isNil, isString } from '../../../utils/type-checkers';
import { FieldValidationError, InvalidUuidError } from '../errors';
import { StringValueObject } from './string-value-object';

export class UUID extends StringValueObject {
  static override create(property: string, uuid: string) {
    if (isNil(uuid)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isString(uuid)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (isEmpty(uuid)) {
      throw new FieldValidationError(`Property ${property} must be a non-empty string`);
    }

    if (hasValue(uuid) && !validate(uuid)) {
      throw new InvalidUuidError(uuid);
    }

    return new UUID(uuid);
  }

  static override createOptional(property: string, uuid?: string) {
    if (isNil(uuid) || isEmpty(uuid)) {
      return undefined;
    }

    if (!isString(uuid)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (hasValue(uuid) && !validate(uuid)) {
      throw new InvalidUuidError(uuid);
    }

    if (isNil(uuid) || isEmpty(uuid)) {
      return undefined;
    }

    return new UUID(uuid);
  }

  static generate() {
    return new UUID(uuidV4());
  }
}
