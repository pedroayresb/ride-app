import {
  useColorModeValue,
} from '@chakra-ui/react';

function Styles() {
  const textColor = useColorModeValue('gray.700', 'white');
  const textColor_ = useColorModeValue('white', 'gray.700');
  const bgPrevButton = useColorModeValue('gray.500', 'gray.500');
  const removeButton = useColorModeValue('red.500', 'red.500');
  const confirmButton = useColorModeValue('teal.300', 'white');
  const concCalcButton = useColorModeValue('green.500', 'green.500');
  const colorStatus = useColorModeValue('gray.500', 'gray.500');
  const borderColor = useColorModeValue('gray.500', 'gray.600');
  const nameColor = useColorModeValue('gray.700', 'white');
  const selectMenuColor = useColorModeValue('white', '#32415e');
  const bgModal = useColorModeValue('#f7fafc', '#1f2733');
  const bgModal_ = useColorModeValue('#1f2733', 'white');
  const gray200 = useColorModeValue('gray.200', 'gray.600');
  const gray300 = useColorModeValue('gray.300', 'gray.600');
  const gray400 = useColorModeValue('gray.400', 'gray.400');
  const gray500 = useColorModeValue('gray.500', 'gray.500');
  const red500 = useColorModeValue('red.500', 'red.500');
  const green500 = useColorModeValue('green.500', 'green.500');
  const teal300 = useColorModeValue('teal.300', 'teal.300');
  const tealConfirmButton = useColorModeValue('teal.300', 'teal.300');
  const bgDarkGrey = useColorModeValue('gray.100', 'gray.700');
  const bgPage = useColorModeValue('#f7fafc', '#1a202c');
  const gray100 = useColorModeValue('gray.100', 'gray.100');
  const modalHeaderText = useColorModeValue('black', 'white');
  const bgHoverLinks = useColorModeValue('gray.100', 'gray.600');
  const datePickerColors = useColorModeValue('#77869b', '#718096');
  const datePickerQuaternaryColor = useColorModeValue('#b2bbd1', '#b2bbd1');
  const tableHeaderColor = useColorModeValue('#a0aec0', '#a0aec0');
  const blue500 = useColorModeValue('blue.500', 'blue.500');
  const activeBg = useColorModeValue('teal.300', 'teal.300');
  const inactiveBg = useColorModeValue('gray.200', 'gray.500');
  const inactiveColorIcon = useColorModeValue('teal.300', 'teal.300');
  const activeColorIcon = useColorModeValue('white', 'white');
  const activeColor = useColorModeValue('gray.700', 'white');
  const inactiveColor = useColorModeValue('gray.400', 'gray.400');
  const colorBox = useColorModeValue('gray.100', 'gray.600');
  const darkOrLight = useColorModeValue('white', 'black');
  const sidebarBg = useColorModeValue('white', 'gray.700');
  const hamburgerColor = useColorModeValue('gray.500', 'gray.200');
  const tooltipBgColor = useColorModeValue('#1f2733', '#cbd5e0');

  const styles = {
    textColor,
    textColor_,
    bgPrevButton,
    removeButton,
    concCalcButton,
    confirmButton,
    colorStatus,
    nameColor,
    selectMenuColor,
    borderColor,
    bgPage,
    gray200,
    gray300,
    gray400,
    gray500,
    blue500,
    red500,
    green500,
    teal300,
    bgModal,
    bgModal_,
    tealConfirmButton,
    bgDarkGrey,
    gray100,
    modalHeaderText,
    tableHeaderColor,
    bgHoverLinks,
    datePickerColors,
    datePickerQuaternaryColor,
    activeBg,
    inactiveBg,
    inactiveColorIcon,
    activeColorIcon,
    activeColor,
    inactiveColor,
    colorBox,
    darkOrLight,
    sidebarBg,
    hamburgerColor,
    tooltipBgColor,
  } as {
    textColor: typeof textColor;
    textColor_: typeof textColor_;
    bgPrevButton: typeof bgPrevButton;
    removeButton: typeof removeButton;
    concCalcButton: typeof concCalcButton;
    confirmButton: typeof confirmButton;
    colorStatus: typeof colorStatus;
    nameColor: typeof nameColor;
    selectMenuColor: typeof selectMenuColor;
    borderColor: typeof borderColor;
    bgPage: typeof bgPage;
    gray200: typeof gray200;
    gray300: typeof gray300;
    gray400: typeof gray400;
    gray500: typeof gray500;
    blue500: typeof blue500;
    red500: typeof red500;
    green500: typeof green500;
    teal300: typeof teal300;
    bgModal: typeof bgModal;
    bgModal_: typeof bgModal_;
    tealConfirmButton: typeof tealConfirmButton;
    bgDarkGrey: typeof bgDarkGrey;
    gray100: typeof gray100;
    modalHeaderText: typeof modalHeaderText;
    tableHeaderColor: typeof tableHeaderColor;
    bgHoverLinks: typeof bgHoverLinks;
    datePickerColors: typeof datePickerColors;
    datePickerQuaternaryColor: typeof datePickerQuaternaryColor;
    activeBg: typeof activeBg;
    inactiveBg: typeof inactiveBg;
    inactiveColorIcon: typeof inactiveColorIcon;
    activeColorIcon: typeof activeColorIcon;
    activeColor: typeof activeColor;
    inactiveColor: typeof inactiveColor;
    colorBox: typeof colorBox;
    darkOrLight: typeof darkOrLight;
    sidebarBg: typeof sidebarBg;
    hamburgerColor: typeof hamburgerColor;
    tooltipBgColor: typeof tooltipBgColor;
  };

  return styles;
}

export default Styles;
