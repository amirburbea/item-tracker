import { handleActions } from 'redux-actions';
import { ErrorStoreState } from './storeState';
import { CLEAR_ERROR_TEXT, SET_ERROR_TEXT } from './actions';

export default handleActions<ErrorStoreState, string>(
  {
    [CLEAR_ERROR_TEXT]: state => ({ ...state, errorText: undefined }),
    [SET_ERROR_TEXT]: (state, { payload }) => ({ ...state, errorText: payload })
  },
  {}
);
