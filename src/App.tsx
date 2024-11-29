import '@mantine/core/styles.css';

import { Code, ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import styled from 'styled-components';

const queryClient = new QueryClient();
const theme = createTheme({});

const Example = styled(Code)`
  &.mantine-Code-root {
    font-size: 2.4rem
  }
`

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Example>Ledn frontend challenge</Example>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
