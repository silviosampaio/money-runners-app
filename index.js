import React from 'react';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_300Light_Italic,
  Ubuntu_400Regular,
  Ubuntu_400Regular_Italic,
  Ubuntu_500Medium,
  Ubuntu_500Medium_Italic,
  Ubuntu_700Bold,
  Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu';

import { Provider as StoreProviver } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { Provider as PaperProvider } from 'react-native-paper';

import Routes from './src/routes';

import store from './src/store';
import { colors } from './src/assets/theme.json';

const App = () => {
  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_300Light_Italic,
    Ubuntu_400Regular,
    Ubuntu_400Regular_Italic,
    Ubuntu_500Medium,
    Ubuntu_500Medium_Italic,
    Ubuntu_700Bold,
    Ubuntu_700Bold_Italic,
  });

  if (!fontsLoaded) {
    // PODERIA EXIBIR A SPLASH SCREEN
    return null;
  }

  return (
    <StoreProviver store={store}>
      <ThemeProvider theme={colors}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </ThemeProvider>
    </StoreProviver>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
