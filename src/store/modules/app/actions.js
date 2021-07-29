import types from './types';

export function setReducer(key, payload) {
  return { type: types.SET_REDUCER, key, payload };
}

export function setUser(payload) {
  return { type: types.SET_USER, payload };
}

export function saveUser() {
  return { type: types.SAVE_USER };
}

export function loginUser() {
  return { type: types.LOGIN_USER };
}

export function getHome() {
  return { type: types.GET_HOME };
}

export function setForm(payload) {
  return { type: types.SET_FORM, payload };
}

export function joinChallenge() {
  return { type: types.JOIN_CHALLENGE };
}

export function saveTracking(operation) {
  return { type: types.SAVE_TRACKING, operation };
}

export function getRanking() {
  return { type: types.GET_RANKING };
}

export function getBalance() {
  return { type: types.GET_BALANCE };
}

export function reset(key) {
  return { type: types.RESET, key };
}
