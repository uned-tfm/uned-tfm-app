import { isNil } from '../../../utils/type-checkers';
import { StorageKeys, StorageRepository } from '../../domain/contracts/storage.repository';

export function localstorageStorageRepositoryBuilder(): StorageRepository {
  return {
    setItem(key: StorageKeys, value: string): void {
      localStorage.setItem(key, value);
    },
    getItem(key: StorageKeys): string {
      const item = localStorage.getItem(key);

      if (isNil(item)) {
        throw new Error(`Key ${key} doesn't exist in localStorage`);
      }

      return item;
    },
    hasItem(key: StorageKeys): boolean {
      const item = localStorage.getItem(key);

      return !isNil(item);
    },
    clearKey(key: StorageKeys): void {
      localStorage.removeItem(key);
    },
    clear(): void {
      localStorage.clear();
    }
  };
}
