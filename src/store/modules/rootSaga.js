import { all } from 'redux-saga/effects';

import app from './app/sagas';

export default function* rootSaga() {
  return yield all([app]);
}
