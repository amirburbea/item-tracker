import { all, fork } from 'redux-saga/effects';
import loadDataSaga from './app/loadDataSaga';
import createItemTypeSaga from './itemTypes/createItemTypeSaga';
import itemSaga from './items/itemSaga';

export default function*() {
  yield all([fork(loadDataSaga), fork(createItemTypeSaga), fork(itemSaga)]);
}
