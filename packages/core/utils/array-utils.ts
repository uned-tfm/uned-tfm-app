import { isArray, isNil } from './type-checkers';

export function union<T extends Record<string, unknown>>(arr1: T[], arr2: T[], prop: string): T[] {
  const result = [...arr1];

  arr2.forEach((item: T) => {
    if (!result.some((x: T) => x[prop] === item[prop])) {
      result.push(item);
    }
  });

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reduce<Input extends { [prop: string]: Output[] | any }, Output>(
  arr: Input[],
  prop: string
): Output[] {
  return arr.reduce((result: Output[], item: Input) => {
    if (isNil(item[prop]) || !isArray(item[prop]) || item[prop].length === 0) {
      return result;
    }

    return result.concat(item[prop]);
  }, []);
}

export function groupBy<T>(array: Array<T>, groupByFn: (t: T) => Array<unknown>): Array<T[]> {
  const groups: Record<string, T[]> = {};

  array.forEach((item: T) => {
    const group = JSON.stringify(groupByFn(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  });

  return Object.keys(groups).map((group) => {
    return groups[group];
  });
}

export async function asyncForEach<T>(
  array: T[],
  callback: (item: T) => Promise<void>
): Promise<void> {
  for (const item of array) {
    await callback(item);
  }
}

export function map<Input, Output>(array: Input[], mapFn: (t: Input) => Output): Output[] {
  if (isNil(array)) {
    return [];
  }

  return array.map(mapFn);
}
