import { connect } from 'react-redux';
import { Items, ItemsStateProps, ItemsDispatchProps } from './component';
import { StoreState } from '../storeState';
import {
  requestCompleteItem as completeItem,
  requestDeleteItem as deleteItem,
  requestCreateItem as createItem
} from './actions';

export default connect<ItemsStateProps, ItemsDispatchProps, {}, StoreState>(
  ({ items: { data: items }, itemTypes: { data: itemTypes } }) => ({
    items,
    itemTypes
  }),
  {
    completeItem,
    deleteItem,
    createItem
  }
)(Items);
