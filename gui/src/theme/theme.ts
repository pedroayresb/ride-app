import { extendTheme } from '@chakra-ui/react';
import globalStyles from './styles';
import buttonStyles from './components/button';
import badgeStyles from './components/badge';
import tableStyles from './components/table';
import linkStyles from './components/link';
import inputsStyle from './components/input';
import drawerStyles from './components/drawer';
import switchStyles from './components/switch';
import CardComponent from './additions/card';
import MainPanelComponent from './additions/layout/MainPanel';

export default extendTheme(
  globalStyles,
  CardComponent,
  buttonStyles,
  badgeStyles,
  tableStyles,
  linkStyles,
  inputsStyle,
  drawerStyles,
  switchStyles,
  MainPanelComponent,
);
