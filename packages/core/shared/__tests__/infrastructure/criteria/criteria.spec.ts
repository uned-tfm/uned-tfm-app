import { CriteriaValidationError } from '../../../domain/errors';
import {
  Filter,
  FilterOperator,
  OrderBy,
  UseCaseCriteria
} from '../../../domain/models/use-case-criteria';
import { criteriaParsed } from '../../../infrastructure/criteria/criteria';

describe('Convert UseCase criteria to Criteria', () => {
  describe('Input validation', () => {
    describe('search input', () => {
      it('Should throw CriteriaValidationError when is not a string', () => {
        const criteria = { search: 1 as unknown as string };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when is empty', () => {
        const criteria = { search: '' };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });
    });

    describe('orderBy input', () => {
      it('Should throw CriteriaValidationError when is empty', () => {
        const criteria = { orderBy: [] as OrderBy[] };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is null', () => {
        const criteria = {
          orderBy: [
            {
              field: null as unknown as string,
              sortDirection: 1 as unknown as string
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is not a string', () => {
        const criteria = {
          orderBy: [
            {
              field: 1 as unknown as string,
              sortDirection: 1 as unknown as string
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is empty', () => {
        const criteria = {
          orderBy: [
            {
              field: '',
              sortDirection: 1 as unknown as string
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when sortDirection is null', () => {
        const criteria = {
          orderBy: [
            {
              field: 'abc',
              sortDirection: null as unknown as string
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when sortDirection is not a string', () => {
        const criteria = {
          orderBy: [
            {
              field: 'abc',
              sortDirection: 1 as unknown as string
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when sortDirection is empty', () => {
        const criteria = {
          orderBy: [
            {
              field: 'abc',
              sortDirection: ''
            }
          ]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });
    });

    describe('filters input', () => {
      it('Should throw CriteriaValidationError when is empty', () => {
        const criteria = { filters: [] as Filter[] };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is not null', () => {
        const criteria = {
          filters: [{ field: null as unknown as string, operator: FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is not a string', () => {
        const criteria = {
          filters: [{ field: 1 as unknown as string, operator: FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when field is empty', () => {
        const criteria = {
          filters: [{ field: '', operator: FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when operator is not null', () => {
        const criteria = {
          filters: [{ field: 'abc', operator: null as unknown as FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when operator is not a string', () => {
        const criteria = {
          filters: [{ field: 'abc', operator: 1 as unknown as FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when operator is not included in FilterOperator', () => {
        const criteria = {
          filters: [{ field: 'abc', operator: 'abc' as unknown as FilterOperator.EQUAL, value: 1 }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });

      it('Should throw CriteriaValidationError when value is null', () => {
        const criteria = {
          filters: [{ field: 'abc', operator: FilterOperator.EQUAL, value: null as unknown }]
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });
    });

    describe('pageSize input', () => {
      it('Should throw CriteriaValidationError when is not a number', () => {
        const criteria = {
          pageSize: 'abc' as unknown as number
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });
    });

    describe('page input', () => {
      it('Should throw CriteriaValidationError when is not a number', () => {
        const criteria = {
          page: 'abc' as unknown as number
        };

        expect(() => criteriaParsed(criteria)).toThrow(CriteriaValidationError);
      });
    });
  });

  describe('Data validation', () => {
    it('Should return orderBy converted to base64', () => {
      const orderBy = [{ field: 'field', sortDirection: 'ASC' }];

      const criteria = criteriaParsed({ orderBy });

      const expectedCriteria = { orderBy: Buffer.from(JSON.stringify(orderBy)).toString('base64') };
      expect(criteria).toMatchObject(expectedCriteria);
    });

    it('Should return filters converted to base64', () => {
      const filters = [{ field: 'field', operator: FilterOperator.EQUAL, value: 1 }];

      const criteria = criteriaParsed({ filters: filters });

      const expectedCriteria = {
        filters: Buffer.from(JSON.stringify(filters)).toString('base64')
      };
      expect(criteria).toMatchObject(expectedCriteria);
    });

    it('Should return an empty Object when criteria is empty', () => {
      const emptyCriteria = {};

      const criteria = criteriaParsed(emptyCriteria);

      expect(criteria).toMatchObject({});
    });

    it('Should return a criteria', () => {
      const inputCriteria: UseCaseCriteria = {
        search: 'search',
        orderBy: [{ field: 'field', sortDirection: 'ASC' }],
        filters: [{ field: 'field', operator: FilterOperator.EQUAL, value: 1 }],
        pageSize: 1,
        page: 1
      };

      const criteria = criteriaParsed(inputCriteria);

      const expectedCriteria = {
        search: 'search',
        orderBy: Buffer.from(JSON.stringify(inputCriteria.orderBy)).toString('base64'),
        filters: Buffer.from(JSON.stringify(inputCriteria.filters)).toString('base64'),
        pageSize: 1,
        page: 1
      };
      expect(criteria).toMatchObject(expectedCriteria);
    });
  });
});
