import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import Styles from '../assets/Styles';
import ReactRouterPrompt from 'react-router-prompt';

export default function WarningComponent({
  isDirty, confirm, close,
}: {
  isDirty: boolean;
  confirm?: () => Promise<unknown>;
  close?: () => Promise<unknown>;
}) {
  const styles = Styles();

  return (
    <ReactRouterPrompt
      when={isDirty}
      beforeConfirm={confirm}
      beforeCancel={close}
    >
      {({
        isActive, onConfirm, onCancel,
      }) => {
        if (!isActive) return null;

        return (
          <>
            <Box
              position="fixed"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.5)"
              zIndex={9998}
              onClick={onCancel}
            />
            <Alert
              left="50%"
              transform="translateX(-50%)"
              status="warning"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              position="fixed"
              bg={styles.gray200}
              w="400px"
              h="fit-content"
              borderRadius="10px"
              top="50px"
              zIndex={9999}
            >
              <AlertIcon
                bg="white"
                borderRadius={999}
                border="1px solid"
                color={styles.removeButton}
                boxSize="40px"
              />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Foram detectadas alterações não salvas
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Deseja realmente sair sem salvar?
                <Flex gap={4} w="100%" justifyContent="center" mt={4}>
                  <Button
                    bg={styles.blue500}
                    color="white"
                    borderRadius="8px"
                    _hover={{
                      bg: styles.gray500,
                    }}
                    onClick={onConfirm}
                    w="50%"
                  >
                    Confirmar
                  </Button>
                  <Button
                    bg={styles.removeButton}
                    color="white"
                    borderRadius="8px"
                    _hover={{
                      bg: styles.gray500,
                    }}
                    onClick={onCancel}
                    w="50%"
                  >
                    Cancelar
                  </Button>
                </Flex>
              </AlertDescription>
            </Alert>
          </>
        );
      }}
    </ReactRouterPrompt>
  );
}
