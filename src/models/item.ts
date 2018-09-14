import { ItemType } from './itemType';
import { ItemStatus } from './itemStatus';

export interface Item {
  id: number;
  type: ItemType;
  status: ItemStatus;
  title: string;
}
