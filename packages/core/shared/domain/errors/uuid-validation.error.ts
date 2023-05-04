export class UuidValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UuidValidationError';
  }
}
