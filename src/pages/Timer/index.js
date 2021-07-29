import React, { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Title,
  Text,
  Spacer,
  Button,
  Badge,
  ProgressCircle,
} from '../../components';

import {
  startInterval,
  stopInterval,
  updateTrackingTime,
} from '../../services/tracking/time';

import { setReducer, saveTracking } from '../../store/modules/app/actions';
import store from '../../store';
import { navigate } from '../../services/navigation';

const Timer = () => {
  const TASK_NAME = 'TRACKING_USER';
  const intervalId = useRef(null);
  const dispatch = useDispatch();
  const { tracking, travelledDistance, dayliAmount, user, challenge } =
    useSelector((state) => state.app);

  const remainingDistance =
    (challenge?.distance / 1000).toFixed(2) - travelledDistance / 100;

  const remainingDistancePercent =
    (travelledDistance / challenge?.distance) * 10;

  const exitMonitoring = async () => {
    await TaskManager.unregisterAllTasksAsync();
    stopInterval(intervalId?.current);
  };

  async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negada',
        'Precisamos de geolocalização para pode registrar sua meta.',
        [
          {
            text: 'Tentar Novamente',
            onPress: () => getLocationAsync(),
          },
          {
            text: 'Voltar',
            onPress: () => {
              exitMonitoring();
              navigate('Home');
            },
          },
        ]
      );
      return;
    }

    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 1,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Monitorando sua meta',
        notificationBody: 'Se movimente, estamos te observando.',
        notificationColor: '#FFF',
      },
    });
  }

  useEffect(() => {
    intervalId.current = startInterval(updateTrackingTime, 1 * 1000);

    TaskManager.defineTask(TASK_NAME, ({ data: { locations }, error }) => {
      if (error) {
        console.tron.log(TASK_NAME + error.message);
        return;
      }

      store.dispatch(
        setReducer(
          'travelledDistance',
          store.getState().app.travelledDistance + 1
        )
      );
    });
    getLocationAsync();

    return () => {
      exitMonitoring();
    };
  }, []);

  useEffect(() => {
    if (parseFloat(remainingDistance) <= 0.0) {
      Alert.alert(
        'Aeeee! Meta Batida',
        `Você acaba de colocar + R$ ${dayliAmount?.toFixed(2)} no seu bolso.`
      );

      dispatch(saveTracking('G'));
      navigate('Home');
      exitMonitoring();
    }
  }, [remainingDistance]);

  useEffect(() => {
    if (tracking?.countdown === '00:00') {
      dispatch(saveTracking('L'));
      navigate('Home');
      exitMonitoring();
    }
  }, [tracking?.countdown]);

  return (
    <Box background="dark" hasPadding justify="center" align="center">
      <Text>Tempo Restante</Text>
      <Spacer size="20px" />
      <Title big color="danger">
        {tracking?.countdown}
      </Title>
      <Spacer size="50px" />

      <Title small color="muted">
        {user?.name?.split(' ')[0]}, faltam
      </Title>
      <Spacer size="20px" />
      <Box justify="center" align="center" height="250px">
        <ProgressCircle
          progress={1 - remainingDistancePercent}
          size="250px"
          color="danger"
        />
        <Title big color="light" bold scale={1.7}>
          {remainingDistance?.toFixed(2)}
        </Title>
      </Box>
      <Spacer size="20px" />
      <Title small color="muted">
        Kilometros p/ meta.
      </Title>
      <Spacer size="50px" />

      <Badge big align="center">
        - R$ {dayliAmount?.toFixed(2)}
      </Badge>
      <Spacer size="20px" />

      <Button block background="danger" onPress={() => navigate('Home')}>
        Desistir
      </Button>
    </Box>
  );
};

export default Timer;
