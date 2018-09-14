import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { StoreState } from '../storeState';
import { loadData } from './actions';
import { App, AppStateProps, AppDispatchProps } from './component';

export default connect<AppStateProps, AppDispatchProps, {}, StoreState>(
  createSelector(
    (state: StoreState) => state.items.data.length,
    (state: StoreState) => state.itemTypes.data.length,
    (itemCount, typeCount): AppStateProps => ({ itemCount, typeCount })
  ),
  { loadData }
)(App);
