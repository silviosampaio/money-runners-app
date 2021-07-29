import React, { useState } from 'react';
import { replace } from '../../services/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Box, Title, Text, Spacer, Cover, Button } from '../../components';

import illustrationOne from '../../assets/illustration-1.png';
import illustrationTwo from '../../assets/illustration-2.png';
import illustrationThree from '../../assets/illustration-3.png';

const Tour = () => {
  const tourData = [
    {
      bg: 'dark',
      button: 'info',
      title: 'Planejamento com motivação.',
      desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
      pic: illustrationOne,
    },
    {
      bg: 'info',
      button: 'dark',
      title: 'Construa hábitos por bem (ou mal).',
      desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
      pic: illustrationTwo,
    },
    {
      bg: 'dark',
      button: 'info',
      title: 'Ganhe dinheiro com os amigos.',
      desc: 'Pensamos em um serviço perfeito pra você não perder mais aquele compromisso inadiável (denovo).',
      pic: illustrationThree,
    },
  ];

  const [actualTour, setActualTour] = useState(0);

  const goLogin = async () => {
    await AsyncStorage.setItem('@tour', 'Y');
    replace('Login');
  };

  return (
    <Box background={tourData[actualTour]?.bg} hasPadding align="center">
      <Box hasPadding>
        <Spacer size="50px" />
        <Title color="light" big bold>
          {tourData[actualTour]?.title}
        </Title>
        <Spacer size="50px" />
        <Cover
          resizeMode="contain"
          width="100%"
          height="300px"
          source={tourData[actualTour]?.pic}
          transparent
        />

        <Spacer size="50px" />
        <Text align="center" color="light">
          {tourData[actualTour]?.desc}
        </Text>
        <Spacer size="20px" />
        <Button
          block
          background={tourData[actualTour]?.button}
          onPress={() => {
            if (actualTour === 2) {
              // NAVIGATE DO LOGIN
              goLogin();
            } else {
              setActualTour(actualTour + 1);
            }
          }}
        >
          {actualTour === 2 ? 'Explorar Desafio' : 'Próximo'}
        </Button>
      </Box>
    </Box>
  );
};

export default Tour;
