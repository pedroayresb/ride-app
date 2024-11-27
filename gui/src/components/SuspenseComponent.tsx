import {
  Grid,
  Text,
  GridProps,
} from '@chakra-ui/react';
import {
  memo,
  PropsWithChildren,
} from 'react';
import '../assets/css/loading.css';

/** Card para suspense e renderização de elemento */
const SuspenseComponent = memo(({
  loading, error, children, ...props
}: PropsWithChildren<{
  loading: boolean;
  error: Error | boolean | null;
} & GridProps>) => {
  if (loading) {
    return (
      <Grid justifyContent="center" w="100%" h="100%" {...props}>
        <Text fontSize="2xl" data-testid="to-render-loading" className="loading">
          Carregando
        </Text>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid justifyContent="center" w="100%" h="100%" {...props}>
        <Text data-testid="SuspenseComponent-title">
          Ocorreu um erro ao carregar o conteúdo
        </Text>
      </Grid>
    );
  }

  return <>{children}</>;
});

export default SuspenseComponent;
