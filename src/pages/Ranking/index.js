import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Title,
  Text,
  Spacer,
  Cover,
  ProgressBar,
  ActivityIndicator,
} from '../../components';
import util from '../../util';

import { getRanking } from '../../store/modules/app/actions';

const Ranking = () => {
  const dispatch = useDispatch();
  const { ranking, form } = useSelector((state) => state.app);
  const [finishedPercentage, setFinishedPercentage] = useState(0);

  useEffect(() => {
    setFinishedPercentage(ranking?.currentPeriod / ranking?.challengePeriod);
  }, [ranking]);

  useEffect(() => {
    dispatch(getRanking());
  }, []);

  return (
    <Box background="dark" hasPadding>
      <Box height="90px">
        <Spacer size="50px" />
        <Title color="light" big>
          Ranking
        </Title>
      </Box>

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
          <Box width="100%" height="140px" spacing="20px 0" row align="center">
            <Box hasPadding width="140px" background="success" radius>
              <Text color="dark">Saldo Extra</Text>
              <Spacer />
              <Title small color="light">
                R$ {ranking?.extraBalance?.toFixed(2)}
              </Title>
            </Box>
            <Box spacing="0 0 0 20px">
              <Text color="light">
                Status ({ranking?.challengePeriod} dias)
              </Text>
              <Spacer />
              <ProgressBar width="100%" progress={finishedPercentage} />
              <Spacer />
              <Text small>
                {finishedPercentage * 100}% ({ranking?.currentPeriod} dias).
                Termina em{' '}
                {moment(ranking?.challengeDate?.end).format('DD/MM/YYYY')}
              </Text>
            </Box>
          </Box>
          <Box>
            <FlatList
              style={{
                width: '100%',
              }}
              data={ranking?.trackingByUser}
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
                    <Text color="light">{index + 1}º</Text>
                    <Cover
                      width="35px"
                      height="35px"
                      circle
                      spacing="0 7px"
                      image={`${util.AWS.bucketURL}/${item?.photo}`}
                    />
                    <Box>
                      <Text color="light">{item?.name}</Text>
                      <Spacer size="2px" />
                      <Text small>
                        {(item?.performance / ranking?.currentPeriod) * 100}% (
                        {item?.performance} dias)
                      </Text>
                    </Box>
                  </Box>

                  <ProgressBar
                    progress={item?.performance / ranking?.currentPeriod}
                  />
                </Box>
              )}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Ranking;
