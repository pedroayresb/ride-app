import {
  memo,
} from 'react';
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from '@chakra-ui/react';
import Styles from '../assets/Styles';

interface FormModalOptions {
  isDisabled: boolean;
  confirmText: string | null;
}

interface CustomModalOptions {
  size?: string;
  showButton?: boolean;
}

type RequiredOptionsIfModal<T extends boolean | undefined> = T extends true ? {
  formModalOptions?: FormModalOptions;
  onSubmit: () => void;
} : {
  formModalOptions?: never;
  onSubmit?: never;
};

type CustomModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  name?: string;
  options?: CustomModalOptions;
  formModal?: boolean;
  formModalOptions?: FormModalOptions;
}>;

/** Componente de modal estilizado */
const CustomModal = memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    title,
    name,
    options = {
      size: '2xl',
      showButton: true,
    },
    formModal,
    formModalOptions,
    children,
    ...props
  }: CustomModalProps
  & RequiredOptionsIfModal<CustomModalProps['formModal']>
  & ModalProps) => {
    const styles = Styles();
    if (!isOpen) return null;

    return (
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        isCentered
        size={options.size}
        scrollBehavior="inside"
        {...props}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="30px"
          display="flex"
          flexDirection="column"
          maxHeight="90vh"
        >
          <ModalHeader
            w="100%"
            color={styles.modalHeaderText}
            display="flex"
            justifyContent="space-between"
            m={1}
            py={2}
            borderBottom="1px solid #E2E8F0"
            alignItems="baseline"
            fontSize="2xl"
            alignSelf="center"
          >
            {title}
            <ModalCloseButton my="auto" />
          </ModalHeader>
          <ModalBody overflowY="auto">
            {children}
          </ModalBody>
          <ModalFooter pt="0px">
            {!formModal && options.showButton &&
              <Button
                variant="no-hover"
                color="white"
                bg={styles.bgPrevButton}
                alignSelf="flex-start"
                w="100px"
                h="40px"
                onClick={onClose}
                borderRadius="8px"
                data-testid={
                  name ?
                    `close-modal-button-${name}` :
                    'close-modal-button'
                }
              >
                Fechar
              </Button>
            }
            {formModal && options.showButton &&
              <Button
                variant="no-hover"
                color="white"
                bg={styles.tealConfirmButton}
                justifySelf="flex-end"
                alignSelf="flex-end"
                w="100px"
                h="40px"
                data-testid={
                  name ?
                    `confirm-modal-button-${name}` :
                    'confirm-modal-button'
                }
                disabled={formModalOptions!.isDisabled}
                borderRadius="8px"
                onClick={() => {
                  onSubmit!();
                  onClose();
                }}
              >
                <Text color="white">
                  {formModalOptions!.confirmText || 'Confirmar'}
                </Text>
              </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
);

export default CustomModal;
