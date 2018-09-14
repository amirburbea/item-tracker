import { ItemsStoreState } from './items/storeState';
import { ItemTypesStoreState } from './itemTypes/storeState';
import { ErrorStoreState } from './error/storeState';

export interface StoreState {
  items: ItemsStoreState;
  itemTypes: ItemTypesStoreState;
  error: ErrorStoreState;
}
