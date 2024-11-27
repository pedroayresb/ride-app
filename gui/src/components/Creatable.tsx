import {
  GroupBase,
} from 'react-select';
import CreatableSelect, {
  CreatableProps,
} from 'react-select/creatable';
import {
  useColorMode,
} from '@chakra-ui/react';
import Styles from '../assets/Styles';

export default function Creatable<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = {
    options: readonly Option[];
  },
>({
  placeholder,
  menuHeight,
  maxMenuHeight,
  testId,
  fontSize = '16px',
  options,
  ...props
}: {
  placeholder?: string;
  menuHeight?: string;
  maxMenuHeight?: string;
  testId?: string;
  fontSize?: string;
  options: Option[];
} & CreatableProps<Option, IsMulti, Group>) {
  const {
    colorMode,
  } = useColorMode();
  const styles = Styles();

  return (
    <CreatableSelect
      menuPortalTarget={document.body}
      menuPosition="fixed"
      placeholder={placeholder || ''}

      id={
        placeholder ?
          `${placeholder.toLowerCase().split(' ')
            .join('')}-select` :
          testId || ''
      }
      classNamePrefix={
        placeholder ?
          `${placeholder.toLowerCase().split(' ')
            .join('')}` :
          testId || ''
      }
      styles={{
        valueContainer: base => ({
          ...base,
          maxHeight: maxMenuHeight || '100%',
          height: menuHeight || '100%',
          overflowY: 'auto',
          fontSize,
        }),
        menuPortal: provided => ({
          ...provided,
          zIndex: 9999,
        }),
        container: provided => ({
          ...provided,
          color: colorMode === 'light' ?
            '#aebac9' :
            '#4c525c',
        }),
        input: provided => ({
          ...provided,
          fontSize,
          marginLeft: '10px',
          color: colorMode === 'light' ?
            '#71757c' :
            '#edeeef',
        }),
        control: provided => ({
          ...provided,
          borderColor: styles.gray100,
          width: '100%',
          borderRadius: '8px',
          backgroundColor: styles.gray200,
          color: styles.gray100,
        }),
        placeholder: provided => ({
          ...provided,
          color: styles.gray100,
          fontSize,
          marginLeft: '10px',
        }),
        menu: provided => ({
          ...provided,
          backgroundColor: colorMode === 'light' ?
            '#ffffff' :
            '#1f2733',
          color: styles.gray100,
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
          zIndex: 9999,
        }),
        multiValue: provided => ({
          ...provided,
          backgroundColor: colorMode === 'light' ?
            '#ffffff' :
            '#1f2733',
          color: colorMode === 'light' ?
            '#71757c' :
            '#edeeef',
          borderRadius: '8px',
        }),
        singleValue: provided => ({
          ...provided,
          color: colorMode === 'light' ?
            '#71757c' :
            '#edeeef',
        }),
        multiValueLabel: provided => ({
          ...provided,
          color: colorMode === 'light' ?
            '#71757c' :
            '#edeeef',
        }),
        option: (style, {
          isDisabled, isFocused, isSelected,
        }) => {
          return {
            ...style,
            fontSize,
            'backgroundColor': isDisabled ?
              undefined :
              isSelected ?
                colorMode === 'light' ?
                  '#1967d2' :
                  '#edeeef' :
                isFocused ?
                  colorMode === 'light' ?
                    '#a3a3a3' :
                    '#1967d2' :
                  undefined,
            'color': isSelected ?
              colorMode === 'light' ?
                '#ffffff' :
                '#000000' :
              isFocused ?
                colorMode === 'light' ?
                  '#1967d2' :
                  '#edeeef' :
                isDisabled ?
                  '#4c525c' :
                  colorMode === 'light' ?
                    '#71757c' :
                    '#648096',
            'cursor': isDisabled ?
              'not-allowed' :
              'default',

            ':active': {
              ...style[':active'],
              backgroundColor: !isDisabled ?
                isSelected ?
                  colorMode === 'light' ?
                    '#1967d2' :
                    '#edeeef' :
                  colorMode === 'light' ?
                    '#a3a3a3' :
                    'white' :
                undefined,
            },
          };
        },
      }}
      options={options}
      {...props}
    />
  );
}
