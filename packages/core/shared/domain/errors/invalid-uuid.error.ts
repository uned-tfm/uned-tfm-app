export class InvalidUuidError extends Error {
  constructor(id: string, fieldName = '') {
    super(
      `Id <${id}> don't satisfy pattern /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i in field ${fieldName}.`
    );
    this.name = 'InvalidUuidError';
  }
}
