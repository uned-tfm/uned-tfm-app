export interface StorageRepository {
  setItem(key: StorageKeys, value: string): void;
  getItem(key: StorageKeys): string;
  hasItem(key: StorageKeys): boolean;
  clearKey(key: StorageKeys): void;
  clear(): void;
}

export enum StorageKeys {
  JWT = 'jwt'
}
