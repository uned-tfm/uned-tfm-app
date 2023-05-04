import { hasValue, isEmpty, isNil, isNumber, isString } from '../../../utils/type-checkers';
import { CriteriaValidationError } from '../../domain/errors';
import { Criteria } from '../../domain/models/criteria';
import {
  Filter,
  FilterOperator,
  OrderBy,
  UseCaseCriteria
} from '../../domain/models/use-case-criteria';

import { Buffer } from 'buffer';

export function criteriaParsed(criteria?: UseCaseCriteria): Criteria {
  if (isNil(criteria)) {
    return {};
  }

  validateSearch(criteria.search);
  validateOrderBy(criteria.orderBy);
  validateFilter(criteria.filters);
  validatePageSize(criteria.pageSize);
  validatePage(criteria.page);

  return {
    search: criteria.search,
    orderBy: criteria.orderBy
      ? Buffer.from(JSON.stringify(criteria.orderBy)).toString('base64')
      : undefined,
    filters: criteria.filters
      ? Buffer.from(JSON.stringify(criteria.filters)).toString('base64')
      : undefined,
    pageSize: criteria.pageSize,
    page: criteria.page
  };
}

function validateSearch(search?: string): void {
  if (hasValue(search)) {
    if (!isString(search)) {
      throw new CriteriaValidationError(`Search must be a string`);
    }

    if (isEmpty(search)) {
      throw new CriteriaValidationError(`Search must be a non-empty string`);
    }
  }
}

function validateOrderBy(orderBy?: OrderBy[]): void {
  if (hasValue(orderBy)) {
    if (isEmpty(orderBy)) {
      throw new CriteriaValidationError(`orderBy must be a non-empty array`);
    }

    validateOrders(orderBy);
  }
}

function validateOrders(orderBy: OrderBy[]) {
  orderBy.forEach((order) => {
    if (isNil(order.field)) {
      throw new CriteriaValidationError(`OrderBy field is required`);
    }

    if (!isString(order.field)) {
      throw new CriteriaValidationError(`OrderBy field must be a string`);
    }

    if (isEmpty(order.field)) {
      throw new CriteriaValidationError(`OrderBy field must be a non-empty string`);
    }

    if (isNil(order.sortDirection)) {
      throw new CriteriaValidationError(`OrderBy sortDirection is required`);
    }

    if (!isString(order.sortDirection)) {
      throw new CriteriaValidationError(`OrderBy sortDirection must be a string`);
    }

    if (isEmpty(order.sortDirection)) {
      throw new CriteriaValidationError(`OrderBy sortDirection must be a non-empty string`);
    }
  });
}

function validateFilter(filters?: Filter[]): void {
  if (hasValue(filters)) {
    if (isEmpty(filters)) {
      throw new CriteriaValidationError(`filters must be a non-empty array`);
    }

    validateFilters(filters);
  }
}

function validateFilters(filters: Filter[]) {
  filters.forEach((filter) => {
    if (isNil(filter.field)) {
      throw new CriteriaValidationError(`Filter field is required`);
    }

    if (!isString(filter.field)) {
      throw new CriteriaValidationError(`Filter field must be a string`);
    }

    if (isEmpty(filter.field)) {
      throw new CriteriaValidationError(`Filter field must be a non-empty string`);
    }

    if (isNil(filter.operator)) {
      throw new CriteriaValidationError(`Filter operator is required`);
    }

    if (!isString(filter.operator)) {
      throw new CriteriaValidationError(`Filter operator must be a string`);
    }

    if (!isValidOperator(filter.operator)) {
      throw new CriteriaValidationError(`Filter operator is not valid`);
    }

    if (isNil(filter.value)) {
      throw new CriteriaValidationError(`Filter value is required`);
    }
  });
}

function validatePageSize(pageSize?: number): void {
  if (hasValue(pageSize)) {
    if (!isNumber(pageSize)) {
      throw new CriteriaValidationError(`pageSize must be a number`);
    }
  }
}

function validatePage(page?: number): void {
  if (hasValue(page)) {
    if (!isNumber(page)) {
      throw new CriteriaValidationError(`page must be a number`);
    }
  }
}

function isValidOperator(operator: string): boolean {
  return Object.values(FilterOperator).includes(operator as FilterOperator);
}
