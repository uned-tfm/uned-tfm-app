import { UseCaseCriteria } from '../domain/models/use-case-criteria';

export type UseCase<Input, Response> = (request: Input) => Promise<Response>;

export type UseCaseWithCriteria<Input, Response> = (
  input: Input,
  criteria?: UseCaseCriteria
) => Promise<Response>;
