export class CriteriaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CriteriaValidationError';
  }
}
