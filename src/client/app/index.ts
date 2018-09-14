import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { StoreState } from '../storeState';
import { loadData } from './actions';
import { clearErrorText } from '../error/actions';
import { App, AppStateProps, AppDispatchProps } from './component';

export default connect<AppStateProps, AppDispatchProps, {}, StoreState>(
  createSelector(
    (state: StoreState) => state.items.data.length,
    (state: StoreState) => state.itemTypes.data.length,
    (state: StoreState) => state.error.errorText,
    (itemCount, typeCount, errorText): AppStateProps => ({
      itemCount,
      typeCount,
      errorText
    })
  ),
  { loadData, clearErrorText }
)(App);
