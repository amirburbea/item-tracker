import { handleActions } from 'redux-actions';
import { ItemTypesStoreState } from './storeState';
import { SET_ITEM_TYPES, ADD_ITEM_TYPE } from './actions';

export default handleActions<ItemTypesStoreState, any>(
  {
    [SET_ITEM_TYPES]: (state, { payload }) => {
      return { ...state, data: payload };
    },
    [ADD_ITEM_TYPE]: (state, { payload }) => {
      return { ...state, data: [...state.data, { name: payload }] };
    }
  },
  { data: [] }
);
