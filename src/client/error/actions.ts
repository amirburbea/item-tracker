import { createAction } from 'redux-actions';

export const SET_ERROR_TEXT = 'SET_ERROR_TEXT';
export const setErrorText = createAction(
  SET_ERROR_TEXT,
  (text: string) => text
);

export const CLEAR_ERROR_TEXT = 'CLEAR_ERROR_TEXT';
export const clearErrorText = createAction(CLEAR_ERROR_TEXT, () => {});
