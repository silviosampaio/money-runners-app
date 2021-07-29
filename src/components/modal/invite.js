import React, { createRef } from 'react';
import { Alert } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextInput, Spacer, Title, Button } from '../index';
import Uploader from '../uploader';
import TextInputMask from '../textInputMask';

import {
  setUser as setUserAction,
  saveUser,
} from '../../store/modules/app/actions';

import InviteScheme from '../../schemas/invite.scheme';

export const modalRef = createRef();

const ModalInvite = () => {
  const dispatch = useDispatch();
  const { userForm, form } = useSelector((state) => state.app);

  const setUser = (payload) => {
    dispatch(setUserAction(payload));
  };

  const sendInvite = async () => {
    try {
      await InviteScheme.validate(userForm);
      dispatch(saveUser());
    } catch ({ errors }) {
      Alert.alert(errors[0], 'Corrija o erro antes de continar.');
    }
  };

  return (
    <Modalize adjustToContentHeight ref={modalRef}>
      <Box hasPadding background="dark">
        <Title color="light">Entre com seus dados</Title>
        <Spacer size="10px" />
        <Uploader
          title="Selecione uma foto"
          desc="Essa será sua foto de perfil"
          btnDesc="Selecionar foto"
          image={userForm?.photo?.uri}
          callback={(photo) => {
            setUser({ photo });
          }}
        />
        <Spacer size="10px" />
        <TextInput
          label="Seu Nome"
          value={userForm?.name}
          disabled={form?.saving}
          onChangeText={(name) => {
            setUser({ name });
          }}
        />
        <Spacer />
        <TextInput
          label="E-mail"
          keyboardType="email-address"
          value={userForm?.email}
          disabled={form?.saving}
          onChangeText={(email) => {
            setUser({ email });
          }}
        />
        <Spacer />
        <TextInputMask
          label="CPF"
          type={'cpf'}
          value={userForm?.cpf}
          disabled={form?.saving}
          onChangeText={(cpf) => {
            setUser({ cpf });
          }}
        />
        <Spacer />
        <TextInputMask
          label="Data de Nascimento"
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          disabled={form?.saving}
          value={userForm?.birthday}
          onChangeText={(birthday) => {
            setUser({ birthday });
          }}
        />
        <Spacer />
        <TextInputMask
          label="Telefone"
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          }}
          disabled={form?.saving}
          value={userForm?.phone}
          onChangeText={(phone) => {
            setUser({ phone });
          }}
        />
        <Spacer />

        <TextInput
          value={userForm?.password}
          disabled={form?.saving}
          onChangeText={(password) => {
            setUser({ password });
          }}
          label="Senha"
          secureTextEntry
        />
        <Spacer />
        <TextInput
          value={userForm?.passwordConfirm}
          disabled={form?.saving}
          onChangeText={(passwordConfirm) => {
            setUser({ passwordConfirm });
          }}
          label="Confirme a senha"
          secureTextEntry
        />
        <Spacer size="10px" />
        <Button
          loading={form?.saving}
          disabled={form?.saving}
          block
          background="success"
          onPress={() => sendInvite()}
        >
          Pedir Convite
        </Button>
      </Box>
    </Modalize>
  );
};

export default ModalInvite;
