export type DeleteResponse = {
  id: string;
};

export type FindAllResponse<ItemType> = {
  total: number;
  items: ItemType[];
  page: number;
  pages: number;
};

export type GetResponse<ItemType> = {
  item: ItemType;
};

export type PatchResponse<ItemType> = {
  item: ItemType;
};

export type PostResponse<T> = {
  isCreated: boolean;
  item: T;
};

export type PutResponse<T> = {
  isUpdated: boolean;
  item: T;
};
