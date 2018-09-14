import { createAction } from 'redux-actions';
import { Item, ItemType } from '../../models';

export const SET_ITEMS = 'SET_ITEMS';
export const setItems = createAction(SET_ITEMS, (items: Item[]) => items);
export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export const completeItem = createAction(
  COMPLETE_ITEM,
  (itemId: number) => itemId
);
export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = createAction(DELETE_ITEM, (itemId: number) => itemId);
export const REQUEST_COMPLETE_ITEM = 'REQUEST_COMPLETE_ITEM';
export const requestCompleteItem = createAction(
  REQUEST_COMPLETE_ITEM,
  (itemId: number) => itemId
);
export const REQUEST_DELETE_ITEM = 'REQUEST_DELETE_ITEM';
export const requestDeleteItem = createAction(
  REQUEST_DELETE_ITEM,
  (itemId: number) => itemId
);
export const CREATE_ITEM = 'CREATE_ITEM';
export const createItem = createAction(
  CREATE_ITEM,
  (type: ItemType, title: string, id: number) => ({ type, title, id })
);
export const REQUEST_CREATE_ITEM = 'REQUEST_CREATE_ITEM';
export const requestCreateItem = createAction(
  REQUEST_CREATE_ITEM,
  (type: ItemType, title: string) => ({ type, title })
);
