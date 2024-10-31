import "@mantine/core/styles.css";

import { QueryClient, QueryClientProvider } from 'react-query';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();
const theme = createTheme({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        Ledn frontend challenge
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
