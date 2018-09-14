import { connect } from 'react-redux';
import { StoreState } from '../storeState';
import {
  ItemTypes,
  ItemTypesStateProps,
  ItemTypesDispatchProps
} from './component';
import { requestAddItemType as createItemType } from './actions';

export default connect<
  ItemTypesStateProps,
  ItemTypesDispatchProps,
  {},
  StoreState
>(
  ({ itemTypes: { data } }: StoreState) => ({ itemTypes: data }),
  { createItemType }
)(ItemTypes);
