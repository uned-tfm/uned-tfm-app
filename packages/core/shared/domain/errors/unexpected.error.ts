export class UnexpectedError extends Error {
  constructor(information = 'Unexpected error') {
    super(information);
    this.name = 'UnexpectedError';
  }
}
