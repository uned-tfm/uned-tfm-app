import { hasValue, isEmpty, isNil, isString } from '../../../utils/type-checkers';
import { isValidUrl } from '../../../utils/validators';
import { FieldValidationError } from './../errors/field-validation.error';
import { StringValueObject } from './string-value-object';

export class UrlValueObject extends StringValueObject {
  static override create(property: string, url: string): UrlValueObject {
    if (isNil(url)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isString(url)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (isEmpty(url)) {
      throw new FieldValidationError(`Property ${property} must be a non-empty string`);
    }

    if (hasValue(url) && !isValidUrl(url)) {
      throw new FieldValidationError(`Property ${property} must be a valid url`);
    }

    return new UrlValueObject(url);
  }

  static override createOptional(property: string, url?: string): UrlValueObject | undefined {
    if (isNil(url) || isEmpty(url)) {
      return undefined;
    }

    if (!isString(url)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (hasValue(url) && !isValidUrl(url)) {
      throw new FieldValidationError(`Property ${property} must be a valid url`);
    }

    return new UrlValueObject(url);
  }
}
