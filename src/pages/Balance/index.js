import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Title,
  Spacer,
  Text,
  Button,
  Badge,
  ActivityIndicator,
} from '../../components';

import { getBalance } from '../../store/modules/app/actions';

const Balance = () => {
  const dispatch = useDispatch();
  const { trackings, form } = useSelector((state) => state.app);

  const operationDict = {
    W: 'Saque Integral',
    G: 'Meta Concluida',
    L: 'Meta Incompleta',
    F: 'Depósito Iniciak',
  };

  useEffect(() => {
    dispatch(getBalance());
  }, []);

  return (
    <Box background="dark" hasPadding>
      {form?.loading && (
        <Box spacing="150px 0 0 0" hasPadding align="center">
          <ActivityIndicator size="large" />
          <Spacer size="20px" />
          <Title color="light" small>
            Buscando informações
          </Title>
          <Spacer size="10px" />
          <Text>Aguarde alguns instantes...</Text>
        </Box>
      )}

      {!form?.loading && (
        <>
          <Spacer size="50px" />
          <Box height="120px">
            <Text>Seu Saldo Disponível</Text>
            <Spacer />
            <Title big color="light">
              R$ {trackings?.balance?.toFixed(2)}
            </Title>
          </Box>
          <Button block background="info">
            Sacar Saldo
          </Button>
          <Spacer size="20px" />
          <FlatList
            style={{
              width: '100%',
            }}
            data={trackings?.records}
            keyExtractor={(item) => item?._id}
            renderItem={({ item, index }) => (
              <Box
                row
                width="100%"
                height="50px"
                align="center"
                spacing="0 0 5px 0"
                justify="space-between"
              >
                <Box row align="center">
                  <Box>
                    <Text color="light">{operationDict[item?.operation]}</Text>
                    <Spacer size="2px" />
                    <Text small>
                      {moment(item?.register).format('DD/MM/YYYY')}
                    </Text>
                  </Box>
                </Box>

                <Badge
                  color={
                    ['W', 'L'].includes(item?.operation) ? 'danger' : 'success'
                  }
                  spacing="7px 0 0"
                >
                  {['W', 'L'].includes(item?.operation) ? '-' : '+'} R${' '}
                  {item?.amount}
                </Badge>
              </Box>
            )}
          />
        </>
      )}
    </Box>
  );
};

export default Balance;
