interface Builder<T> {
  build(): T;
}

export function createMany<T>(total: number, builder: () => Builder<T>): T[] {
  const result = [];

  for (let i = 0; i < total; i++) {
    result.push(builder().build());
  }

  return result;
}
