import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import YoutubePlayer from 'react-native-youtube-iframe';

import {
  ScrollView,
  Box,
  GradientView,
  Title,
  Text,
  Spacer,
  Cover,
  Button,
  Badge,
  ProgressCircle,
  Touchable,
  ActivityIndicator,
} from '../../components';

import { colors } from '../../assets/theme.json';
import { navigate } from '../../services/navigation';
import util from '../../util';
import {
  startInterval,
  stopInterval,
  updateTrackingTime,
} from '../../services/tracking/time';

import { getHome, saveTracking } from '../../store/modules/app/actions';

const Home = () => {
  moment.locale('pt-br');

  const dispatch = useDispatch();
  const {
    user,
    isParticipant,
    challenge,
    balance,
    form,
    tracking,
    dailyAmount,
    challengePeriod,
    participatedTimes,
    discipline,
    dailyResults,
  } = useSelector((state) => state.app);

  const [timeToChallenge, setTimeToChallenge] = useState('');

  const todayChallengeDateTime = moment(challenge?.time.start, 'HH:mm');
  const nextChallengeDate = moment().isAfter(todayChallengeDateTime)
    ? moment().add(1, 'day')
    : moment();

  useEffect(() => {
    dispatch(getHome());
  }, []);

  useEffect(() => {
    const intervalId = startInterval(updateTrackingTime, 1 * 1000);
    return () => {
      stopInterval(intervalId);
    };
  }, [challenge, isParticipant]);

  useEffect(() => {
    setTimeToChallenge(
      moment.duration(nextChallengeDate.diff(moment())).humanize()
    );

    // ENVIANDO NO ÚLTIMO SEGUNDO
    if (tracking?.countdown === '00:01' && tracking?.isTime) {
      dispatch(saveTracking('L'));
    }
  }, [tracking?.countdown]);

  return (
    <ScrollView background="dark">
      <GradientView
        end={{ x: 0, y: 1 }}
        locations={[-0.5, 1]}
        colors={[colors.info, colors.primary]}
        hasPadding
      >
        <Box height="100%" width="100%" justify="center" align="center">
          <Spacer size="20px" />
          <Box
            justify="center"
            align="center"
            height={isParticipant ? '120px' : '100px'}
          >
            {isParticipant && <ProgressCircle progress={discipline} />}
            <Cover
              width="100px"
              height="100px"
              circle
              image={`${util.AWS.bucketURL}/user/${user?._id}.jpeg`}
            />
          </Box>
          <Spacer size="30px" />
          <Title color="light">
            {isParticipant
              ? `${(discipline * 100).toFixed(0)}% de disciplina`
              : user?.name}
          </Title>
          <Spacer size="5px" />
          <Text>
            {isParticipant
              ? `${participatedTimes}/${challengePeriod} dias concluidos`
              : user?.email}
          </Text>

          {isParticipant && (
            <Touchable spacing="20px 0 0">
              <Box hasPadding background="success" radius>
                <Text color="dark">Saldo Conquistado</Text>
                <Spacer />
                <Title small color="light">
                  R$ {balance.toFixed(2)}
                </Title>
              </Box>
            </Touchable>
          )}
          <Spacer size="20px" />
        </Box>
      </GradientView>

      <Box hasPadding spacing="-50px 0 0 0">
        {form.loading && (
          <Box background="dark50" hasPadding radius align="center">
            <ActivityIndicator size="large" />
            <Spacer size="20px" />
            <Title color="light" small>
              Buscando informações
            </Title>
            <Spacer size="10px" />
            <Text>Aguarde alguns instantes...</Text>
          </Box>
        )}

        {!challenge && !form.loading && (
          <Box background="dark50" hasPadding radius>
            <Title color="light" small>
              Nenhum desafio encontrado.
            </Title>
            <Spacer size="10px" />
            <Text>No momento, não há desafios a fazer.</Text>
            <Spacer size="20px" />
            <Button
              block
              background="success"
              onPress={() => {
                dispatch(getHome());
              }}
            >
              Recarregar
            </Button>
          </Box>
        )}

        {!isParticipant && !form.loading && challenge && (
          <>
            <Box background="dark50" hasPadding radius>
              <Title color="light" small>
                {challenge?.title}
              </Title>
              <Spacer size="10px" />
              <Text>{challenge?.description}</Text>
              <Spacer size="20px" />
              <Button
                block
                background="success"
                onPress={() => {
                  navigate('Payment');
                }}
              >
                Participar Agora
              </Button>
            </Box>
            <Spacer size="20px" />
            <Box background="dark50" hasPadding radius align="center">
              <Title color="light" small>
                Eai?! Vai encarar o desafio?!
              </Title>
              <Spacer size="20px" />
              <YoutubePlayer
                height={180}
                width="100%"
                videoId={challenge?.ytVideoId}
              />
            </Box>
          </>
        )}

        {isParticipant && !form.loading && challenge && !tracking?.isTime && (
          <Box background="dark50" hasPadding radius spacing="0 0 20px 0">
            <Text>{moment().format('dddd[, ] DD/MM/YYYY')}</Text>
            <Spacer size="5px" />
            <Title color="light" small>
              Resultados de Hoje.
            </Title>
            <Spacer size="20px" />
            <FlatList
              style={{
                width: '100%',
              }}
              data={dailyResults}
              keyExtractor={(item) => item?._id}
              ListEmptyComponent={() => (
                <Box align="center">
                  <Title align="center" color="light">
                    Nenhum resultado...
                  </Title>
                  <Text align="center">
                    O seu desafio começa em{' '}
                    <Text color="danger">{timeToChallenge}</Text>!
                  </Text>
                  <Spacer size="20px" />
                  <Button
                    block
                    background="info"
                    onPress={() => dispatch(getHome())}
                  >
                    Recarregar
                  </Button>
                </Box>
              )}
              renderItem={({ item }) => (
                <View style={{ height: 50 }}>
                  <Box
                    row
                    width="100%"
                    align="center"
                    spacing="0 0 5px 0"
                    justify="space-between"
                  >
                    <Box row align="center">
                      <Cover
                        width="35px"
                        height="35px"
                        circle
                        spacing="0 7px 0 0"
                        image={`${util.AWS.bucketURL}/${item?.userId?.photo}`}
                      />
                      <Text color="light">{item?.userId?.name}</Text>
                    </Box>

                    <Badge
                      color={item?.operation === 'L' ? 'danger' : 'success'}
                      spacing="7px 0 0"
                    >
                      {item?.operation === 'L' ? '-' : '+'} R$ {item?.amount}
                    </Badge>
                  </Box>
                </View>
              )}
            />
          </Box>
        )}

        {isParticipant && !form.loading && challenge && tracking?.isTime && (
          <>
            <Box background="dark50" hasPadding radius align="center">
              <Badge big align="center" color="success">
                + R$ {dailyAmount?.toFixed(2)}
              </Badge>
              <Spacer size="15px" />
              <Text>{moment().format('dddd[, ] DD/MM/YYYY')}</Text>
              <Spacer />
              <Title color="light" small align="center">
                Inicie seu compromisso.
              </Title>
              <Spacer size="30px" />
              <Title color="danger" big>
                {tracking?.countdown}
              </Title>
              <Spacer size="30px" />
              <Button
                block
                background="info"
                onPress={() => {
                  navigate('Timer');
                }}
              >
                Iniciar Agora
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ScrollView>
  );
};

export default Home;
