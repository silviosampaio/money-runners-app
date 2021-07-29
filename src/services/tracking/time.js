import React from 'react';
import moment from 'moment';

import { setReducer } from '../../store/modules/app/actions';
import store from '../../store';

export const startInterval = (cb = () => {}, interval) => {
  return setInterval(() => {
    cb();
  }, interval);
};

export const stopInterval = (intervalId) => {
  clearInterval(intervalId);
};

export const updateTrackingTime = () => {
  const { challengeFinishedToday, challenge, isParticipant } =
    store.getState().app;

  const now = moment();
  const start = moment(challenge?.time?.start, 'HH:mm');
  const end = moment(challenge?.time?.end, 'HH:mm');
  const seconds = end.diff(now, 'seconds');

  const setTracking = (isTime = false) => {
    store.dispatch(
      setReducer('tracking', {
        isTime,
        countdown: moment().startOf('day').seconds(seconds).format('mm:ss'),
      })
    );
  };

  if (!Boolean(challenge) || !isParticipant) {
    setTracking();
    return false;
  }

  if (!now.isBetween(start, end)) {
    setTracking();
    return false;
  }

  setTracking(!challengeFinishedToday);
};
