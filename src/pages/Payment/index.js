import React from 'react';
import { Alert } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

import { useDispatch, useSelector } from 'react-redux';

import { Box, Spacer, Title, Text, Button } from '../../components';
import { colors } from '../../assets/theme.json';

import {
  setReducer,
  joinChallenge as joinChallengeAction,
} from '../../store/modules/app/actions';

import CreditCardScheme from '../../schemas/credit-card.scheme.js';

const Payment = () => {
  const dispatch = useDispatch();
  const { form, challenge, payment } = useSelector((state) => state.app);

  const setPayment = ({ number, cvc, expiry, name }) => {
    dispatch(
      setReducer('payment', {
        card_number: number?.split(' ').join(''),
        card_cvv: cvc,
        card_expiration_date: expiry?.replace('/', ''),
        card_holder_name: name,
      })
    );
  };

  const joinChallenge = async () => {
    try {
      await CreditCardScheme.validate(payment);
      dispatch(joinChallengeAction());
    } catch (error) {
      console.tron.log(error);
      //Alert.alert(errors[0], 'Corrija o erro antes de continar.');
    }
  };

  return (
    <Box background="dark" hasPadding>
      <Box>
        <Spacer size="20px" />
        <Title color="light">Entrar no desafio: {challenge?.title}</Title>
        <Spacer size="10px" />
        <Text>{challenge?.description}</Text>
        <Spacer size="50px" />
        <CreditCardInput
          allowScroll
          requiresName
          onChange={({ values }) => setPayment(values)}
          placeholders={{
            number: '**** **** **** ****',
            expiry: 'MM/YY',
            cvc: 'CVC',
            name: 'NOME COMPLETO',
          }}
          labels={{
            number: 'NÚMERO NO CARTÃO',
            expiry: 'DATA EXP.',
            cvc: 'CVC/CCV',
            name: 'NOME NO CARTÃO',
          }}
          inputStyle={{
            color: colors.light,
          }}
        />
      </Box>

      <Button
        block
        background="success"
        onPress={() => joinChallenge()}
        disabled={form?.saving}
        loading={form?.saving}
      >
        Pagar R$ {challenge?.fee}
      </Button>
    </Box>
  );
};

export default Payment;
