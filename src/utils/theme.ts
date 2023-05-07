import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

const dark = {
  statusBarStyle: 'light-content',
  statusBarColor: '#32A041',
  primary: '#32A041',
  background: '#151515',
  text: '#F8F8F8',
  textSecondary: '#9A9A9A',
  belowGrade: '#ea1111',
  overGrade: '#1E7E34',
}

const light = {
  ...dark,
  //background: '#FAFAFA'
}

const theme = colorScheme === 'dark' ? dark : light;

export default theme;