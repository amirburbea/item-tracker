import { all, fork } from 'redux-saga/effects';
import loadDataSaga from './app/loadDataSaga';
import createItemTypeSaga from './itemTypes/createItemTypeSaga';

export default function*() {
  yield all([fork(loadDataSaga), fork(createItemTypeSaga)]);
}
