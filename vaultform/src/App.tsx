import './App.css';
import { Form } from './components/Form';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        fontFamily: 'Inter, sans-serif',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Form />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
