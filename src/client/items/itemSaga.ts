import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { setErrorText } from '../error/actions';
import { ItemType } from '../../models';
import {
  REQUEST_COMPLETE_ITEM,
  completeItem,
  REQUEST_CREATE_ITEM,
  createItem,
  REQUEST_DELETE_ITEM,
  deleteItem
} from './actions';

export default function*() {
  yield all([
    fork(takeEvery, REQUEST_COMPLETE_ITEM, completeSaga),
    fork(takeEvery, REQUEST_DELETE_ITEM, deleteSaga),
    fork(takeEvery, REQUEST_CREATE_ITEM, createItemSaga)
  ]);
}

function* completeSaga({ payload: itemId }: Action<number>) {
  async function callServer() {
    const res = await window.fetch('/api/item/complete', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await res.text();
  }
  try {
    yield call(callServer);
    yield put(completeItem(itemId!));
  } catch (error) {
    yield put(setErrorText(error.message));
  }
}

function* deleteSaga({ payload: itemId }: Action<number>) {
  async function callServer() {
    const res = await window.fetch('/api/item', {
      method: 'DELETE',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await res.text();
  }
  try {
    yield call(callServer);
    yield put(deleteItem(itemId!));
  } catch (error) {
    yield put(setErrorText(error.message));
  }
}

function* createItemSaga({ payload }: Action<ItemType>) {
  try {
    async function callServer() {
      const res = await window.fetch('/api/item', {
        method: 'POST',
        body: JSON.stringify({ itemType: payload!.name }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return Number(await res.text());
    }

    const id: number = yield call(callServer);
    yield put(createItem(payload!, id));
  } catch (error) {
    yield put(setErrorText(error.message));
  }
}
