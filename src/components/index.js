import styled from 'styled-components/native';

import {
  Text as TextPaper,
  Title as TitlePaper,
  Badge as BadgePaper,
  Button as ButtonPaper,
  TextInput as TextInputPaper,
  ProgressBar as ProgressBarPaper,
  ActivityIndicator as ActivityIndicatorPaper,
} from 'react-native-paper';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressCircle as ProgressCircleSVG } from 'react-native-svg-charts';

import { ScrollView as ScrollViewComponent } from 'react-native-gesture-handler';

import util from '../util';

export const ScrollView = styled(ScrollViewComponent)`
  width: 100%;
  background: ${(props) =>
    props.theme[props.background] || props.background || 'transparent'};
`;

export const Spacer = styled.View`
  width: 100%;
  height: ${(props) => props.size || '10px'};
`;

export const Cover = styled.ImageBackground.attrs((props) =>
  props.image
    ? {
        source: { uri: props.image },
      }
    : undefined
)`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '100px'};
  margin: ${(props) => props.spacing || '0px'};
  border-radius: ${(props) => (props.circle ? props.width : '3px')};
  border: ${(props) => props.border || 'none'};
  overflow: hidden;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.muted};
`;

export const Box = styled.View`
  flex: 1;
  flex-wrap: ${(props) => props.wrap || 'nowrap'};
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  max-width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  max-height: ${(props) => props.height || 'auto'};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  padding-top: ${(props) =>
    props.removePaddingTop ? '0' : props.hasPadding ? '20px' : '0px'};
  padding-bottom: ${(props) =>
    props.removePaddingBottom ? '0' : props.hasPadding ? '20px' : '0px'};
  margin: ${(props) => props.spacing || 0};
  border-radius: ${(props) => (props.radius ? '5px' : '0px')};
  border: ${(props) => props.border || 'none'};
  background: ${(props) =>
    props.theme[props.background] || props.background || 'transparent'};
`;

export const Touchable = styled(TouchableOpacity)`
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  margin: ${(props) => props.spacing || 0};
  background: ${(props) =>
    props.theme[props.background] || props.background || 'transparent'};
  border-radius: ${(props) => props.rounded || 0};
  border: ${(props) => props.border || 'none'};
`;

export const GradientView = styled(LinearGradient)`
  flex: 1;
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  justify-content: ${(props) => props.justify || 'flex-start'};
`;

export const Title = styled(TitlePaper)`
  color: ${(props) => props.theme[props.color || 'dark']};
  font-size: ${(props) => (props.small ? '22px' : props.big ? '50px' : '30px')};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  letter-spacing: -0.8px;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  line-height: ${(props) =>
    props.small ? '22px' : props.big ? '50px' : '30px'};
  text-align: ${(props) => props.align || 'left'};
  transform: ${(props) => (props.scale ? `scale(${props.scale})` : '')};
`;

export const Text = styled(TextPaper).attrs({})`
  color: ${(props) => props.theme[props.color || 'muted']};
  font-size: ${(props) => (props.small ? '13px' : '17px')};
  font-family: ${(props) =>
    props.bold ? 'Ubuntu_700Bold' : 'Ubuntu_300Light'};
  margin: ${(props) => props.spacing || 0};
  padding: ${(props) => (props.hasPadding ? '20px' : '0px')};
  line-height: ${(props) => (props.small ? '13px' : '20px')};
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
  opacity: 0.7;
  text-align: ${(props) => props.align || 'left'};
`;

export const Badge = styled(BadgePaper)`
  align-self: flex-start;
  width: auto;
  height: auto;
  font-size: ${(props) => (props.big ? '20px' : '16px')};
  padding: ${(props) => (props.big ? '12px 15px' : '5px 10px')};
  line-height: 25px;
  margin: ${(props) => props.spacing || '0px'};
  align-self: ${(props) => props.align || 'flex-start'};
  border-radius: 100px;
  color: ${(props) => props.theme[props.color || 'danger']};
  background: ${(props) =>
    util.toAlpha(props.theme[props.color || 'danger'], 20)};
`;

export const Button = styled(ButtonPaper).attrs((props) => ({
  color:
    props.theme[props.background] || props.background || props.theme.primary,
  width: props.block ? '100%' : 'auto',
  labelStyle: {
    color: props.theme[props.textColor || 'light'],
    letterSpacing: 0,
    fontFamily: 'Ubuntu_400Regular',
  },
  mode: 'contained',
}))``;

export const TextInput = styled(TextInputPaper).attrs(({ theme }) => ({
  mode: 'outlined',
  outlineColor: theme.muted,
  underlineColor: theme.muted,
  selectionColor: theme.muted,
  theme: {
    colors: {
      text: theme.light,
      primary: theme.light,
      background: theme.dark,
      placeholder: theme.muted,
    },
  },
}))`
  height: 45px;
  width: 100%;
  font-size: 15px;
`;

export const ProgressCircle = styled(ProgressCircleSVG).attrs((props) => ({
  progressColor: props.theme[props.color] || props.theme.secondary,
  backgroundColor: props.background || util.toAlpha(props.theme.primary, 20),
}))`
  width: ${(props) => props.size || '120px'};
  height: ${(props) => props.size || '120px'};
  position: absolute;
`;

export const ProgressBar = styled(ProgressBarPaper).attrs((props) => ({
  color: props.theme[props.color] || props.theme.info,
}))`
  width: ${(props) => props.width || '100px'};
  height: 10px;
  border-radius: 20px;
  background: ${(props) => util.toAlpha(props.theme.light, 20)};
`;

export const ActivityIndicator = styled(ActivityIndicatorPaper).attrs(
  (props) => ({
    animating: true,
    color: props.theme[props.color],
  })
)``;
