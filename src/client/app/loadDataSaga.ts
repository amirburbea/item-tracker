import { takeEvery, call, put } from 'redux-saga/effects';
import { ItemType, Item } from '../../models';
import { LOAD_DATA } from './actions';
import { setItems } from '../items/actions';
import { setItemTypes } from '../itemTypes/actions';
import { setErrorText } from '../error/actions';

export default function*() {
  yield takeEvery(LOAD_DATA, loadInitialData);
}

function* loadInitialData() {
  const getData = () => {
    return window.fetch(`/api/data`).then(res => res.json());
  };
  try {
    const { items, itemTypes } = (yield call(getData)) as {
      items: Item[];
      itemTypes: ItemType[];
    };
    yield put(setItems(items));
    yield put(setItemTypes(itemTypes));
  } catch (error) {
    yield put(setErrorText(error.message));
  }
}
