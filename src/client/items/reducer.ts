import { handleActions, Action } from 'redux-actions';
import { ItemsStoreState } from './storeState';
import { SET_ITEMS, COMPLETE_ITEM, DELETE_ITEM, CREATE_ITEM } from './actions';
import { ItemStatus, ItemType } from '../../models';

export default handleActions<ItemsStoreState, any>(
  {
    [SET_ITEMS]: (state, { payload }) => {
      return { ...state, data: payload };
    },
    [COMPLETE_ITEM]: (state, { payload: itemId }) => {
      const index = state.data.findIndex(({ id }) => id === itemId);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        data: [
          ...state.data.slice(0, index),
          { ...state.data[index], status: ItemStatus.complete },
          ...state.data.slice(index + 1)
        ]
      };
    },
    [DELETE_ITEM]: (state, { payload: itemId }) => {
      const index = state.data.findIndex(({ id }) => id === itemId);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        data: [...state.data.slice(0, index), ...state.data.slice(index + 1)]
      };
    },
    [CREATE_ITEM]: (
      state,
      { payload }: Action<{ type: ItemType; id: number; title: string }>
    ) => {
      return {
        ...state,
        data: [...state.data, { ...payload!, status: ItemStatus.open }]
      };
    }
  },
  { data: [] }
);
