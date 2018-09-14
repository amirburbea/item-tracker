import { createAction } from 'redux-actions';

export const LOAD_DATA = 'LOAD_DATA';
export const loadData = createAction(LOAD_DATA, () => {});
