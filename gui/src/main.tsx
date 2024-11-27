// import { StrictMode } from 'react';
import {
  createRoot,
} from 'react-dom/client';
import App from './App.tsx';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import EstimateProvider from './providers/EstimateProvider.tsx';
import theme from './theme/theme';
import '../src/assets/css/scrollbar.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      notifyOnChangeProps: [
        'data',
        'error',
        'isLoading',
      ],
    },
  },
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <EstimateProvider>
        <App />
      </EstimateProvider>
    </ChakraProvider>
  </QueryClientProvider>,
  // </StrictMode>,
);
