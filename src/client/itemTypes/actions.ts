import * as React from 'react';
import { createAction } from 'redux-actions';
import { ItemType } from '../../models';

export const SET_ITEM_TYPES = 'SET_ITEM_TYPES';
export const setItemTypes = createAction(
  SET_ITEM_TYPES,
  (types: ItemType[]) => types
);

export const REQUEST_ADD_ITEM_TYPE = 'REQUEST_ADD_ITEM_TYPE';
export const requestAddItemType = createAction(
  REQUEST_ADD_ITEM_TYPE,
  (name: React.ReactText) => name
);

export const ADD_ITEM_TYPE = 'ADD_ITEM_TYPE';
export const addItemType = createAction(
  ADD_ITEM_TYPE,
  (name: string) => name
);
