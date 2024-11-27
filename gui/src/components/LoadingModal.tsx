import {
  Modal,
  ModalOverlay,
  ModalContent,
  Grid,
  Text,
  Flex,
} from '@chakra-ui/react';
import '../assets/css/loading.css';

export default function LoadingModal({
  isOpen,
}: {
  isOpen: boolean;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Grid justifyContent="center" w="100%" h="100%">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="2xl" data-testid="loading-text" className="loading">
              Carregando
            </Text>
          </Flex>
        </Grid>
      </ModalContent>
    </Modal>
  );
}
