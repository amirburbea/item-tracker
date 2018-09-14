import { Action } from 'redux-actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { REQUEST_ADD_ITEM_TYPE, addItemType } from './actions';
import { setErrorText } from '../error/actions';

export default function*() {
  yield takeEvery(REQUEST_ADD_ITEM_TYPE, createItemType);
}

async function postItemType(name: string) {
  const response = await window.fetch('/api/itemType', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  await response.text();
}

function* createItemType({ payload }: Action<string>) {
  try {
    yield call(postItemType, payload!);
    yield put(addItemType(payload!));
  } catch (error) {
    yield put(setErrorText(error.message));
  }
}
