import types from './types';
import produce from 'immer';

const INITIAL_STATE = {
  userForm: {},
  user: {},
  form: {
    disabled: false,
    loading: false,
    saving: false,
  },
  payment: {},
  tracking: {
    isTime: false,
    countdown: 0,
  },
  trackings: {},
  travelledDistance: 0,
  dailyAmount: 0,
  challengePeriod: 0,
  participatedTimes: 0,
  discipline: 0,
  balance: 0,
  isParticipant: false,
  challenge: null,
  challengeFinishedToday: false,
  dailyResults: [],
  ranking: {},
};

function salao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_REDUCER: {
      return produce(state, (draft) => {
        draft[action.key] = action.payload;
      });
    }
    case types.SET_USER: {
      return produce(state, (draft) => {
        draft.userForm = { ...state.userForm, ...action.payload };
      });
    }
    case types.SET_FORM: {
      return produce(state, (draft) => {
        draft.form = { ...state.form, ...action.payload };
      });
    }
    case types.RESET: {
      return produce(state, (draft) => {
        draft[action.key] = INITIAL_STATE[action.key];
      });
    }

    default:
      return state;
  }
}

export default salao;
