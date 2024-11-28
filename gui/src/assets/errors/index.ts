import {
  useToast,
} from '@chakra-ui/react';

export default function Errors() {
  const ERRORS = {
    NO_CUSTOMER_ID: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'O ID do cliente é obrigatório.',
      status: 'error',
    }),
    NO_ORIGIN: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'A origem é obrigatória.',
      status: 'warning',
    }),
    NO_DESTINATION: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'O destino é obrigatório.',
      status: 'warning',
    }),
    SAME_ORIGIN_DESTINATION: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'Origem e destino não podem ser iguais.',
      status: 'warning',
    }),
    INVALID_DRIVER: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'Motorista inválido.',
      status: 'error',
    }),
    DRIVER_NOT_FOUND: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'Motorista não encontrado.',
      status: 'error',
    }),
    INVALID_DISTANCE: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'Distância inválida.',
      status: 'error',
    }),
    NO_RIDES_FOUND: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Dados inválidos',
      description: 'Nenhuma corrida encontrada.',
      status: 'warning',
    }),
    INTERNAL_SERVER_ERROR: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Erro interno',
      description: 'Ocorreu um erro interno. Tente novamente mais tarde.',
      status: 'error',
    }),
    INVALID_ADDRESS: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'E',
      description: 'Ocorreu um erro interno. Tente novamente mais tarde.',
      status: 'error',
    }),
    LATLNG_ERROR: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Erro interno',
      description: 'Ocorreu um errro com os locais. Preencha novamente.',
      status: 'error',
    }),
    NO_ROUTE_FOUND: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Erro interno',
      description: 'Nenhuma rota encontrada. Tente novamente mais tarde.',
      status: 'error',
    }),
    ROUTE_ERROR: useToast({
      position: 'top-right',
      duration: 5000,
      isClosable: true,
      title: 'Erro interno',
      description: 'Ocorreu um erro buscando a sua rota. Tente novamente mais tarde.',
      status: 'error',
    }),
  };

  return ERRORS;
}
