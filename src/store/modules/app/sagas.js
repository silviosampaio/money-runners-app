import { Alert } from 'react-native';
import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import api from '../../../services/api';
import util from '../../../util';
import types from './types';
import { replace, navigate } from '../../../services/navigation';
import { modalRef as modalInviteRef } from '../../../components/modal/invite';
import { modalRef as modalLoginRef } from '../../../components/modal/login';
import {
  setReducer,
  setForm,
  reset,
  getHome as getHomeAction,
} from './actions';

export function* saveUser() {
  const { userForm } = yield select((state) => state.app);

  yield put(setForm({ saving: true }));

  try {
    const form = new FormData();
    form.append('name', userForm?.name);
    form.append('email', userForm?.email);
    form.append('cpf', userForm?.cpf.match(/\d+/g).join(''));
    form.append(
      'birthday',
      moment(userForm?.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')
    );
    form.append('phone', userForm?.phone.match(/\d+/g).join(''));
    form.append('password', userForm.password);

    form.append('photo', {
      name: new Date().getTime() + '.' + util.getMimeType(userForm?.photo?.uri),
      type: `image/${util.getMimeType(userForm?.photo?.uri)}`,
      uri: userForm?.photo?.uri,
    });

    const { data: res } = yield call(api.post, `/user/`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(reset('userForm'));
    yield call(modalInviteRef?.current?.close);

    Alert.alert(
      'Solicitação enviada!',
      'Seu convite foi recebido com sucesso! Fique atento em seu e-mail ou pelo app, iremos enviar uma notificação caso você seja aprovado.',
      [
        {
          text: 'Voltar para Home',
          onPress: async () => {},
        },
      ]
    );
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ saving: false }));
  }
}

export function* loginUser() {
  const { userForm } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(api.post, `/user/login`, userForm);

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.user));
    yield put(setReducer('user', res.user));
    yield put(reset('userForm'));
    yield call(modalLoginRef?.current?.close);
    yield call(replace, 'Home');
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export function* getHome() {
  const { user } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(api.get, `/user/${user?._id}/challenge`);

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(setReducer('isParticipant', res.isParticipant));
    yield put(setReducer('challenge', res.challenge));
    yield put(setReducer('dailyAmount', res.dailyAmount));
    yield put(setReducer('challengePeriod', res.challengePeriod));
    yield put(setReducer('participatedTimes', res.participatedTimes));
    yield put(setReducer('discipline', res.discipline));
    yield put(setReducer('balance', res.balance));
    yield put(setReducer('challengeFinishedToday', res.challengeFinishedToday));
    yield put(setReducer('dailyResults', res.dailyResults));
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export function* joinChallenge() {
  const { user, challenge, payment } = yield select((state) => state.app);

  yield put(setForm({ saving: true }));

  try {
    const { data: res } = yield call(api.post, `/challenge/join`, {
      userId: user?._id,
      challengeId: challenge?._id,
      creditCard: payment,
    });

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(getHomeAction());
    yield navigate('Home');
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ saving: false }));
  }
}

export function* saveTracking({ operation }) {
  const { user, challenge, dailyAmount } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(api.post, `/challenge/tracking`, {
      userId: user?._id,
      challengeId: challenge?._id,
      operation,
      amount: dailyAmount?.toFixed(2),
    });

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(getHomeAction());
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export function* getHanking() {
  const { challenge } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(
      api.get,
      `/challenge/${challenge?._id}/ranking`
    );

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(setReducer('ranking', res));
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export function* getBalance() {
  const { user } = yield select((state) => state.app);

  yield put(setForm({ loading: true }));

  try {
    const { data: res } = yield call(api.get, `/user/${user?._id}/balance`);

    if (res.error) {
      Alert.alert('Ops!', res.message, [
        {
          text: 'Tentar novamente',
          onPress: () => {},
        },
      ]);
      return false;
    }

    yield put(setReducer('trackings', res));
  } catch (err) {
    Alert.alert('Erro interno!', err.message);
  } finally {
    yield put(setForm({ loading: false }));
  }
}

export default all([
  takeLatest(types.SAVE_USER, saveUser),
  takeLatest(types.LOGIN_USER, loginUser),
  takeLatest(types.GET_HOME, getHome),
  takeLatest(types.JOIN_CHALLENGE, joinChallenge),
  takeLatest(types.SAVE_TRACKING, saveTracking),
  takeLatest(types.GET_RANKING, getHanking),
  takeLatest(types.GET_BALANCE, getBalance),
]);
