export type UseCaseCriteria = {
  search?: string;
  orderBy?: OrderBy[];
  filters?: Filter[];
  pageSize?: number;
  page?: number;
};

export type OrderBy = {
  field: string;
  sortDirection: string;
};

export type Filter = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

export enum FilterOperator {
  EQUAL = 'equal',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte'
}
