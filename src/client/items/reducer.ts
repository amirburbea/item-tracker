import { handleActions } from 'redux-actions';
import { ItemsStoreState } from './storeState';
import { SET_ITEMS, COMPLETE_ITEM } from './actions';
import { ItemStatus } from '../../models';

export default handleActions<ItemsStoreState, any>(
  {
    [SET_ITEMS]: (state, action) => ({ ...state, data: action.payload }),
    [COMPLETE_ITEM]: (state, { payload: itemId }) => {
      const index = state.data.findIndex(({ id }) => id === itemId);
      if (index !== -1) {
        return {
          ...state,
          data: [
            ...state.data.slice(0, index),
            { ...state.data[index], status: ItemStatus.complete },
            ...state.data.slice(index + 1)
          ]
        };
      }
      return state;
    }
  },
  { data: [] }
);
