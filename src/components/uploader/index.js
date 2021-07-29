import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Box, Title, Text, Button, Spacer, Touchable, Cover } from '../index';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import util from '../../util';
import { colors } from '../../assets/theme.json';

const Uploader = ({
  title,
  desc,
  btnDesc,
  bg = null,
  callback = () => {},
  image = null,
}) => {
  const requestAccess = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negaga.',
        'Desculpe, mas precisamos acessar suas fotos.',
        [
          {
            text: 'Permitir Acesso',
            onPress: () => {
              requestAccess();
            },
            style: 'cancel',
          },
          {
            text: 'Cancelar',
          },
        ]
      );
    }
  };

  useEffect(() => {
    requestAccess();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    callback(result);
  };

  return (
    <>
      {image && (
        <Cover
          onPress={() => pickImage()}
          width="100%"
          height="230px"
          radius="0px"
          image={image}
        >
          <Box
            height="100%"
            width="100%"
            direction="column"
            hasPadding
            justify="flex-end"
            background={util.toAlpha(colors.light, 30)}
          >
            <Spacer size="25px" />
            <Button
              mode="contained"
              background="dark"
              block
              onPress={() => pickImage()}
            >
              Alterar Imagem
            </Button>
          </Box>
        </Cover>
      )}
      {!image && (
        <Box
          hasPadding
          background={!bg ? util.toAlpha(colors.light, 35) : bg}
          justify="center"
          align="center"
          height="230px"
        >
          <Box direction="column" hasPadding justify="center" align="center">
            <Icon
              name="image"
              size={70}
              color={util.toAlpha(colors.light, 95)}
            />
            <Spacer size="15px" />
            <Title color="light" align="center" small>
              {title}
            </Title>
            <Text color="light" align="center" small>
              {desc}
            </Text>
            <Spacer size="25px" />
            <Button
              color="light"
              background="dark"
              block
              onPress={() => pickImage()}
            >
              {btnDesc}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Uploader;
