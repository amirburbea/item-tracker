import { combineReducers } from 'redux';
import { StoreState } from './storeState';
import items from './items/reducer';
import itemTypes from './itemTypes/reducer';
import error from './error/reducer';

export default combineReducers<StoreState>({ items, itemTypes, error } as any);
