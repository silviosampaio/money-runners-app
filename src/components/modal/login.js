import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextInput, Spacer, Title, Button } from '../index';

import {
  setUser as setUserAction,
  loginUser,
} from '../../store/modules/app/actions';

import LoginScheme from '../../schemas/login.scheme';

export const modalRef = React.createRef();

const ModalLogin = () => {
  const dispatch = useDispatch();
  const { userForm, form } = useSelector((state) => state.app);

  const setUser = (payload) => {
    dispatch(setUserAction(payload));
  };

  const sendLogin = async () => {
    try {
      await LoginScheme.validate(userForm);
      dispatch(loginUser());
    } catch ({ errors }) {
      Alert.alert(errors[0], 'Corrija o erro antes de continar.');
    }
  };

  return (
    <Modalize adjustToContentHeight ref={modalRef}>
      <Box hasPadding background="dark">
        <Title color="light">Entre com seus dados</Title>
        <Spacer size="10px" />
        <TextInput
          label="E-mail"
          keyboardType="email-address"
          value={userForm?.email}
          disabled={form?.loading}
          onChangeText={(email) => {
            setUser({ email });
          }}
        />
        <Spacer />
        <TextInput
          value={userForm?.password}
          disabled={form?.loading}
          onChangeText={(password) => {
            setUser({ password });
          }}
          label="Senha"
          secureTextEntry
        />
        <Spacer size="10px" />
        <Button
          disabled={form?.loading}
          loading={form?.loading}
          block
          background="success"
          onPress={() => sendLogin()}
        >
          Fazer Login
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalLogin;
