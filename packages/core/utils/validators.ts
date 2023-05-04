import { FieldValidationError } from '../shared/domain/errors';

export function isValidEmailAddress(email: string): boolean {
  const emailRegex = /^(.+)@(\S+)$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))|' +
      'localhost' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return urlRegex.test(url);
}

export function validatePasswordPattern(password: string): void {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()_+-=;,.<>?]{8,}$/;
  const isValidPassword = passwordRegex.test(password);

  if (!isValidPassword) {
    throw new FieldValidationError(`Password ${password} is not valid`);
  }
}

export function isValidPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()_+-=;,.<>?]{8,}$/;
  const isValidPassword = passwordRegex.test(password);

  return isValidPassword;
}

export function isGreaterThan(value: number, greaterThan: number): boolean {
  return value > greaterThan;
}

export function isPositiveInt(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
