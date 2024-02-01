import './App.css';
import { Form } from './components/Form';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100', // Set the global background color
        fontFamily: 'Inter, sans-serif', // Set the default font family
      },
    },
  },
  // You can extend the theme further to include custom colors, fonts, etc.
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
