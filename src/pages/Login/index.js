import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { replace } from '../../services/navigation';
import Logo from '../../assets/logo.png';
import {
  Box,
  Text,
  Spacer,
  Cover,
  Button,
  ActivityIndicator,
} from '../../components';

import ModalLogin, {
  modalRef as modalLoginRef,
} from '../../components/modal/login';
import ModalInvite, {
  modalRef as modalInviteRef,
} from '../../components/modal/invite';

import { setReducer } from '../../store/modules/app/actions';

const Login = () => {
  const dispatch = useDispatch();
  const [loggedState, setLoggedState] = useState(false);

  const getLoggedState = async () => {
    // await AsyncStorage.clear();
    const user = await AsyncStorage.getItem('@user');
    const tour = await AsyncStorage.getItem('@tour');

    if (!tour) {
      replace('Tour');
      return false;
    }

    if (!user) {
      setLoggedState(true);
    } else {
      dispatch(setReducer('user', JSON.parse(user)));
      replace('Home');
    }
  };

  useEffect(() => {
    getLoggedState();
  }, []);

  return (
    <>
      <ModalLogin />
      <ModalInvite />
      <Box background="dark" hasPadding>
        <Box hasPadding align="center" justify="center">
          <Cover
            source={Logo}
            width="80%"
            height="300px"
            transparent
            resizeMode="contain"
          />
          <Spacer size="100px" />

          {!loggedState && <ActivityIndicator color="info" size="large" />}

          {loggedState && (
            <>
              <Button
                background="info"
                block
                onPress={() => modalLoginRef?.current?.open()}
              >
                Entrar
              </Button>
              <Spacer />
              <Button
                background="dark"
                block
                onPress={() => modalInviteRef?.current?.open()}
              >
                Pedir Convite
              </Button>
              <Spacer size="20px" />
              <Text color="light" align="center" small>
                Ao fazer login, você concorda com nossos{' '}
                <Text color="info" underline small>
                  Termos e condições
                </Text>{' '}
                e{' '}
                <Text color="info" underline small>
                  Política de privacidade
                </Text>
                .
              </Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Login;
